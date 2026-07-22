import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROFILE } from '../apollo/client/mutations';
import { MY_ORDERS, VIEWER } from '../apollo/client/queries';
import Page from '../components/page';
import LoadingPage from '../components/loading-page';
import useCurrency from '../hooks/use-currency';
import useLocale from '../hooks/use-locale';

function formatDate(value, localeCode) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) ? new Date(numericValue) : new Date(value);
  return new Intl.DateTimeFormat(localeCode, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function Profile() {
  const { formatPrice } = useCurrency();
  const { t, localeCode } = useLocale();
  const router = useRouter();
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: ordersData, loading: ordersLoading } = useQuery(MY_ORDERS, { skip: !viewer });
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE, { refetchQueries: [VIEWER] });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!viewerLoading && !viewer) router.replace('/user/login?redirect=/profile');
    if (viewer) setName(viewer.name);
  }, [router, viewer, viewerLoading]);

  if (viewerLoading || !viewer || ordersLoading) return <Page><LoadingPage /></Page>;

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await updateProfile({ variables: { name } });
      setMessage(t('profile.updated'));
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  const orders = ordersData?.myOrders || [];
  return (
    <Page title={`${t('profile.title')} - ${t('common.siteName')}`}>
      <div className="profile-page">
        <div className="page-heading"><p className="eyebrow">{t('profile.account')}</p><h1>{t('profile.title')}</h1><p>{t('profile.intro')}</p></div>
        <div className="profile-layout">
          <section className="profile-card">
            <p className="card-eyebrow">{t('profile.accountDetails')}</p>
            <h2>{viewer.name}</h2>
            <form onSubmit={handleProfileSubmit}>
              {error && <p className="message error" role="alert">{error}</p>}
              {message && <p className="message success" role="status">{message}</p>}
              <label>{t('profile.name')}<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
              <label>{t('checkout.email')}<input value={viewer.email} readOnly /></label>
              <p className="joined">{t('profile.memberSince', { date: formatDate(viewer.createdAt, localeCode) })}</p>
              <button type="submit" disabled={updating}>{updating ? t('common.saving') : t('common.save')}</button>
            </form>
          </section>
          <section className="orders-card">
            <div className="orders-heading"><div><p className="card-eyebrow">{t('profile.history')}</p><h2>{t('profile.yourOrders')}</h2></div><span>{orders.length} {t(orders.length === 1 ? 'common.order' : 'common.orders')}</span></div>
            {!orders.length ? (
              <div className="empty-orders"><p>{t('profile.noOrders')}</p><Link href="/"><a>{t('profile.explore')}</a></Link></div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <Link href={`/order/${order.id}`} key={order.id}>
                    <a className="order-row">
                      <span><strong>{order.order_number}</strong><small>{formatDate(order.created_at, localeCode)} · {order.items.length} {t(order.items.length === 1 ? 'common.item' : 'common.items')}</small></span>
                      <span className="order-status">{order.status}</span>
                      <strong>{formatPrice(order.total)} →</strong>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <style jsx>{`
        .profile-page { width: 100%; max-width: 1080px; }
        .page-heading { margin-bottom: 28px; }
        .eyebrow, .card-eyebrow { margin: 0; color: var(--quantum-blue); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .page-heading h1 { margin: 6px 0 8px; color: var(--quantum-ink); font-size: 38px; font-weight: 900; letter-spacing: -1px; }
        .page-heading > p:last-child { margin: 0; color: #8b94a3; font-size: 14px; }
        .profile-layout { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; align-items: start; }
        .profile-card, .orders-card { box-sizing: border-box; padding: 26px; border: 1px solid #edf0f5; border-radius: 12px; background: #fff; box-shadow: 0 10px 24px rgba(34,55,89,.06); }
        h2 { margin: 8px 0 22px; color: #424b5c; font-size: 22px; }
        .profile-card h2 { font-size: 25px; }
        label { display: block; margin-top: 17px; color: #555f70; font-size: 12px; font-weight: 800; }
        input { box-sizing: border-box; width: 100%; min-height: 46px; margin-top: 7px; padding: 0 12px; border: 1px solid #e1e6ee; border-radius: 9px; background: #fbfcfe; color: #424b5c; font: inherit; font-size: 13px; transition: border-color .2s, box-shadow .2s, background .2s; }
        input:focus { border-color: var(--quantum-blue); outline: none; box-shadow: 0 0 0 3px rgba(96,123,150,.12); }
        input[readonly] { color: #919aa8; }
        .joined { margin: 16px 0; color: #9da6b3; font-size: 11px; line-height: 1.5; }
        .profile-card button { width: 100%; min-height: 46px; border: 0; border-radius: 9px; background: var(--quantum-blue); color: #fff; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; transition: transform .2s, box-shadow .2s; }
        .profile-card button:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(24,117,240,.2); }
        .profile-card button:disabled { opacity: .65; cursor: wait; }
        .message { padding: 10px; border-radius: 9px; font-size: 12px; }
        .message.error { background: #fff4f4; color: #b54747; }
        .message.success { background: #effaf3; color: #25965a; }
        .orders-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .orders-heading h2 { margin-bottom: 0; }
        .orders-heading > span { color: #8b94a3; font-size: 12px; }
        .orders-list { margin-top: 20px; border-top: 1px solid #edf0f4; }
        .order-row { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 18px; align-items: center; padding: 17px 0; border-bottom: 1px solid #edf0f4; color: #424b5c; text-decoration: none; }
        .order-row span:first-child { min-width: 0; }
        .order-row strong { display: block; font-size: 13px; }
        .order-row small { display: block; margin-top: 5px; color: #9da6b3; font-size: 11px; }
        .order-status { padding: 5px 8px; border-radius: 20px; background: #edf7f0; color: #25965a; font-size: 10px; font-weight: 800; text-transform: capitalize; }
        .empty-orders { padding: 40px 0 18px; color: #8b94a3; font-size: 14px; text-align: center; }
        .empty-orders a { display: inline-block; margin-top: 10px; color: var(--quantum-blue); font-weight: 800; text-decoration: none; }
        @media (max-width: 760px) { .profile-layout { grid-template-columns: 1fr; } .profile-card { max-width: none; } .order-row { grid-template-columns: minmax(0,1fr) auto; } .order-row > strong { grid-column: 1 / -1; } }
      `}</style>
    </Page>
  );
}
