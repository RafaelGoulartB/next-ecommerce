import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROFILE } from '../apollo/client/mutations';
import { MY_ORDERS, VIEWER } from '../apollo/client/queries';
import Page from '../components/page';
import LoadingPage from '../components/loading-page';

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function formatDate(value) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) ? new Date(numericValue) : new Date(value);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function Profile() {
  const router = useRouter();
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: ordersData, loading: ordersLoading } = useQuery(MY_ORDERS, { skip: !viewer });
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE, { refetchQueries: [VIEWER] });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!viewerLoading && !viewer) {
      router.replace('/user/login?redirect=/profile');
    }
    if (viewer) setName(viewer.name);
  }, [router, viewer, viewerLoading]);

  if (viewerLoading || !viewer || ordersLoading) return <Page><LoadingPage /></Page>;

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await updateProfile({ variables: { name } });
      setMessage('Profile updated.');
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  const orders = ordersData?.myOrders || [];
  return (
    <Page title="My profile - Quantum E-commerce">
      <div className="profile-page">
        <div className="page-heading"><p className="eyebrow">Your account</p><h1>Profile</h1><p>Manage your details and keep track of your Quantum orders.</p></div>
        <div className="profile-layout">
          <section className="profile-card">
            <p className="card-eyebrow">Account details</p>
            <h2>{viewer.name}</h2>
            <form onSubmit={handleProfileSubmit}>
              {error && <p className="message error" role="alert">{error}</p>}
              {message && <p className="message success" role="status">{message}</p>}
              <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
              <label>Email<input value={viewer.email} readOnly /></label>
              <p className="joined">Member since {formatDate(viewer.createdAt)}</p>
              <button type="submit" disabled={updating}>{updating ? 'Saving…' : 'Save changes'}</button>
            </form>
          </section>
          <section className="orders-card">
            <div className="orders-heading"><div><p className="card-eyebrow">Purchase history</p><h2>Your orders</h2></div><span>{orders.length} orders</span></div>
            {!orders.length ? (
              <div className="empty-orders"><p>You have not placed an order yet.</p><Link href="/"><a>Explore products</a></Link></div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <Link href={`/order/${order.id}`} key={order.id}>
                    <a className="order-row">
                      <span><strong>{order.order_number}</strong><small>{formatDate(order.created_at)} · {order.items.length} items</small></span>
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
        .eyebrow, .card-eyebrow { margin: 0; color: #1875f0; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .page-heading h1 { margin: 6px 0 8px; color: #424b5c; font-size: 38px; font-weight: 900; }
        .page-heading > p:last-child { margin: 0; color: #8b94a3; font-size: 14px; }
        .profile-layout { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; align-items: start; }
        .profile-card, .orders-card { box-sizing: border-box; padding: 26px; border-radius: 10px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
        h2 { margin: 8px 0 22px; color: #424b5c; font-size: 22px; }
        .profile-card h2 { font-size: 25px; }
        label { display: block; margin-top: 17px; color: #555f70; font-size: 12px; font-weight: 800; }
        input { box-sizing: border-box; width: 100%; min-height: 44px; margin-top: 7px; padding: 0 11px; border: 1px solid #e1e6ee; border-radius: 6px; background: #fbfcfe; color: #424b5c; font: inherit; font-size: 13px; }
        input:focus { border-color: #1875f0; outline: none; box-shadow: 0 0 0 3px rgba(24,117,240,.1); }
        input[readonly] { color: #919aa8; }
        .joined { margin: 16px 0; color: #9da6b3; font-size: 11px; line-height: 1.5; }
        .profile-card button { width: 100%; min-height: 42px; border: 0; border-radius: 6px; background: #1875f0; color: #fff; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; }
        .profile-card button:disabled { opacity: .65; cursor: wait; }
        .message { padding: 10px; border-radius: 6px; font-size: 12px; }
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
        .empty-orders a { display: inline-block; margin-top: 10px; color: #1875f0; font-weight: 800; text-decoration: none; }
        @media (max-width: 760px) { .profile-layout { grid-template-columns: 1fr; } .profile-card { max-width: none; } .order-row { grid-template-columns: minmax(0,1fr) auto; } .order-row > strong { grid-column: 1 / -1; } }
      `}</style>
    </Page>
  );
}
