import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Page from '../../components/page';
import LoadingPage from '../../components/loading-page';
import ErrorAlert from '../../components/alerts/error';
import { ORDER_DETAILS, VIEWER } from '../../apollo/client/queries';

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function formatDate(value) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) ? new Date(numericValue) : new Date(value);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function OrderDetails() {
  const router = useRouter();
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const { data, loading, error } = useQuery(ORDER_DETAILS, {
    variables: { id: typeof router.query.id === 'string' ? router.query.id : '' },
    skip: !router.isReady || typeof router.query.id !== 'string' || !viewerData?.viewer,
  });

  useEffect(() => {
    if (!viewerLoading && !viewerData?.viewer && router.isReady) {
      router.replace(`/user/login?redirect=${encodeURIComponent(`/order/${router.query.id}`)}`);
    }
  }, [router, viewerData, viewerLoading]);

  if (viewerLoading || loading || !viewerData?.viewer) return <Page><LoadingPage /></Page>;
  if (error || !data?.order) return <Page><ErrorAlert message="This order is not available." /></Page>;

  const order = data.order;
  return (
    <Page title={`${order.order_number} - Quantum E-commerce`}>
      <div className="order-page">
        <Link href="/profile"><a className="back-link">← Back to profile</a></Link>
        <div className="heading"><div><p className="eyebrow">Order confirmed</p><h1>{order.order_number}</h1><p>Placed on {formatDate(order.created_at)}</p></div><span className="status">{order.status}</span></div>
        <div className="order-layout">
          <section className="items-card"><h2>Items</h2>{order.items.map((item) => <div className="item" key={`${order.id}-${item.product_name}`}><span><strong>{item.product_name}</strong><small>{item.quantity} × {formatPrice(item.unit_price)}</small></span><strong>{formatPrice(item.line_total)}</strong></div>)}<div className="total"><span>Total</span><strong>{formatPrice(order.total)}</strong></div></section>
          <aside className="contact-card"><h2>Contact details</h2><p><strong>{order.contact_name}</strong><br />{order.contact_email}{order.phone && <><br />{order.phone}</>}</p><div className="demo-note">This order was created through the simulated checkout. No payment was collected.</div></aside>
        </div>
      </div>
      <style jsx>{`
        .order-page { width: 100%; max-width: 980px; }
        .back-link { display: inline-block; margin-bottom: 24px; color: var(--quantum-blue); font-size: 13px; font-weight: 800; text-decoration: none; }
        .heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 26px; }
        .eyebrow { margin: 0; color: var(--quantum-blue); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        h1 { margin: 6px 0 7px; color: var(--quantum-ink); font-size: 34px; font-weight: 900; letter-spacing: -.8px; }
        .heading p:last-child { margin: 0; color: #8b94a3; font-size: 13px; }
        .status { padding: 7px 11px; border-radius: 20px; background: #edf7f0; color: #25965a; font-size: 11px; font-weight: 800; text-transform: capitalize; }
        .order-layout { display: grid; grid-template-columns: minmax(0,1fr) 280px; gap: 24px; align-items: start; }
        .items-card, .contact-card { padding: 26px; border: 1px solid #edf0f5; border-radius: 12px; background: #fff; box-shadow: 0 10px 24px rgba(34,55,89,.06); }
        h2 { margin: 0 0 20px; color: #424b5c; font-size: 20px; }
        .item { display: flex; justify-content: space-between; gap: 16px; padding: 17px 0; border-bottom: 1px solid #edf0f4; color: #424b5c; }
        .item strong { font-size: 13px; line-height: 1.4; }
        .item small { display: block; margin-top: 5px; color: #9da6b3; font-size: 11px; }
        .total { display: flex; justify-content: space-between; padding-top: 21px; color: #424b5c; font-size: 16px; font-weight: 800; }
        .total strong { font-size: 22px; }
        .contact-card p { margin: 0 0 22px; color: #687386; font-size: 13px; line-height: 1.7; }
        .contact-card p strong { color: #424b5c; }
        .demo-note { padding: 13px; border-radius: 9px; background: #f2f7ff; color: #59708d; font-size: 12px; line-height: 1.5; }
        @media (max-width: 720px) { .heading { align-items: flex-start; flex-direction: column; } .order-layout { grid-template-columns: 1fr; } }
      `}</style>
    </Page>
  );
}
