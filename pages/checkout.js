import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import Page from '../components/page';
import LoadingPage from '../components/loading-page';
import EmptySection from '../components/emptySection';
import { CREATE_ORDER } from '../apollo/client/mutations';
import { GUEST_CART, MY_CART, PRODUCTS_BY_IDS, VIEWER } from '../apollo/client/queries';

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

export default function Checkout() {
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: guestData, loading: guestLoading } = useQuery(GUEST_CART);
  const { data: myCartData, loading: myCartLoading } = useQuery(MY_CART, { skip: !viewer });
  const guestItems = guestData?.guestCart?.items || [];
  const { data: guestProductsData, loading: guestProductsLoading } = useQuery(PRODUCTS_BY_IDS, {
    variables: { id: guestItems.map((item) => item.id) },
    skip: Boolean(viewer) || !guestItems.length,
  });
  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!viewer) return;
    setContactName(viewer.name || '');
    setContactEmail(viewer.email || '');
  }, [viewer]);

  const loading = viewerLoading || guestLoading || (viewer ? myCartLoading : guestProductsLoading);
  if (loading) return <Page><LoadingPage /></Page>;

  const items = viewer
    ? myCartData?.myCart?.items || []
    : (guestProductsData?.productsById || []).map((product) => {
        const localItem = guestItems.find((item) => String(item.id) === String(product.id));
        return {
          productId: product.id,
          product,
          quantity: localItem?.quantity || 0,
          unitPrice: product.price,
          lineTotal: (Number(product.price) * Number(localItem?.quantity || 0)).toFixed(2),
        };
      });
  const subtotal = viewer
    ? myCartData?.myCart?.subtotal || '0.00'
    : items.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0).toFixed(2);

  if (!items.length) {
    return <Page><EmptySection name="cart" /></Page>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!viewer) {
      window.location.href = `/user/login?redirect=${encodeURIComponent('/checkout')}`;
      return;
    }
    try {
      const result = await createOrder({
        variables: { input: { contactName, contactEmail, phone: phone || null } },
      });
      window.location.href = `/order/${result.data.createOrder.id}`;
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <Page title="Checkout - Quantum E-commerce">
      <div className="checkout-page">
        <div className="checkout-heading">
          <p className="eyebrow">Almost there</p>
          <h1>Checkout</h1>
          <p>Confirm your contact details and place a simulated order.</p>
        </div>
        <div className="checkout-layout">
          <form className="contact-card" onSubmit={handleSubmit}>
            <div className="card-heading"><p className="card-eyebrow">01</p><h2>Contact details</h2></div>
            {!viewer && <div className="signin-note">You can keep browsing as a guest. Sign in or create an account to confirm this order and save it to your history.</div>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <label>Full name<input value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Alex Morgan" autoComplete="name" required /></label>
            <label>Email address<input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Phone <span>(optional)</span><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 555 000 0000" autoComplete="tel" /></label>
            <button type="submit" disabled={creatingOrder}>{!viewer ? 'Sign in to confirm order' : creatingOrder ? 'Creating order…' : 'Place simulated order'}</button>
            <small>No payment details are collected. This is a demonstration checkout.</small>
          </form>
          <aside className="summary-card">
            <div className="card-heading"><p className="card-eyebrow">02</p><h2>Order summary</h2></div>
            <div className="summary-items">
              {items.map((item) => <div className="summary-item" key={item.productId}><span>{item.product.name} × {item.quantity}</span><strong>{formatPrice(item.lineTotal)}</strong></div>)}
            </div>
            <div className="total-row"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
            <Link href="/cart"><a className="back-link">← Back to cart</a></Link>
          </aside>
        </div>
      </div>
      <style jsx>{`
        .checkout-page { width: 100%; max-width: 1000px; }
        .checkout-heading { margin-bottom: 28px; }
        .eyebrow, .card-eyebrow { margin: 0; color: #1875f0; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .checkout-heading h1 { margin: 6px 0 8px; color: #424b5c; font-size: 38px; font-weight: 900; }
        .checkout-heading > p:last-child { margin: 0; color: #8b94a3; font-size: 14px; }
        .checkout-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr); gap: 26px; align-items: start; }
        .contact-card, .summary-card { box-sizing: border-box; padding: 28px; border-radius: 10px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
        .card-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
        .card-heading h2 { margin: 0; color: #424b5c; font-size: 21px; }
        .card-eyebrow { display: flex; align-items: center; justify-content: center; width: 25px; height: 25px; border-radius: 50%; background: #edf4ff; font-size: 10px; }
        .signin-note { margin-bottom: 18px; padding: 13px 14px; border-radius: 6px; background: #f2f7ff; color: #59708d; font-size: 13px; line-height: 1.5; }
        .form-error { padding: 12px; border-radius: 6px; background: #fff4f4; color: #b54747; font-size: 13px; }
        label { display: block; margin-top: 16px; color: #555f70; font-size: 13px; font-weight: 800; }
        label span { color: #9da6b3; font-weight: 400; }
        input { box-sizing: border-box; width: 100%; min-height: 48px; margin-top: 7px; padding: 0 13px; border: 1px solid #e1e6ee; border-radius: 7px; background: #fbfcfe; color: #424b5c; font: inherit; font-size: 14px; outline: none; }
        input:focus { border-color: #1875f0; box-shadow: 0 0 0 4px rgba(24,117,240,.1); }
        .contact-card button { width: 100%; min-height: 48px; margin-top: 24px; border: 0; border-radius: 7px; background: #1875f0; color: #fff; cursor: pointer; font: inherit; font-weight: 800; }
        .contact-card button:disabled { cursor: wait; opacity: .65; }
        .contact-card small { display: block; margin-top: 13px; color: #9da6b3; font-size: 11px; line-height: 1.5; text-align: center; }
        .summary-items { display: grid; gap: 15px; padding: 2px 0 20px; }
        .summary-item { display: flex; justify-content: space-between; gap: 12px; color: #687386; font-size: 13px; line-height: 1.4; }
        .summary-item strong { color: #424b5c; white-space: nowrap; }
        .total-row { display: flex; justify-content: space-between; padding-top: 18px; border-top: 1px solid #e9edf3; color: #424b5c; font-size: 16px; font-weight: 800; }
        .total-row strong { font-size: 23px; }
        .back-link { display: block; margin-top: 22px; color: #1875f0; font-size: 12px; text-align: center; text-decoration: none; }
        @media (max-width: 780px) { .checkout-layout { grid-template-columns: 1fr; } .summary-card { order: -1; } }
      `}</style>
    </Page>
  );
}
