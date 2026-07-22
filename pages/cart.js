import Link from 'next/link';
import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import LoadingPage from '../components/loading-page';
import { GUEST_CART, MY_CART, PRODUCTS_BY_IDS, VIEWER } from '../apollo/client/queries';
import useShoppingState from '../hooks/use-shopping-state';
import useCurrency from '../hooks/use-currency';
import useLocale from '../hooks/use-locale';

export default function Cart() {
  const { formatPrice } = useCurrency();
  const { t } = useLocale();
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: guestCartData, loading: guestCartLoading } = useQuery(GUEST_CART);
  const { data: myCartData, loading: myCartLoading } = useQuery(MY_CART, { skip: !viewer });
  const guestItems = guestCartData?.guestCart?.items || [];
  const { data: guestProductsData, loading: guestProductsLoading } = useQuery(PRODUCTS_BY_IDS, {
    variables: { id: guestItems.map((item) => item.id) },
    skip: Boolean(viewer) || !guestItems.length,
  });
  const { setCartQuantity, removeCartProduct } = useShoppingState();
  const loading = viewerLoading || guestCartLoading || (viewer ? myCartLoading : guestProductsLoading);
  if (loading) return <Page><LoadingPage /></Page>;

  const items = viewer
    ? myCartData?.myCart?.items || []
    : (guestProductsData?.productsById || []).map((product) => {
        const localItem = guestItems.find((item) => String(item.id) === String(product.id));
        const quantity = localItem?.quantity || 0;
        return { productId: product.id, product, quantity, unitPrice: product.price, lineTotal: (Number(product.price) * quantity).toFixed(2) };
      });
  const subtotal = viewer
    ? myCartData?.myCart?.subtotal || '0.00'
    : items.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0).toFixed(2);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!items.length) {
    return <Page><Title title={t('header.cart')} /><EmptySection name={t('header.cart').toLowerCase()} /></Page>;
  }

  return (
    <Page title={`${t('header.cart')} - ${t('common.siteName')}`}>
      <div className="cart-page">
        <div className="cart-heading">
          <div><p className="eyebrow">{t('cart.ready')}</p><Title title={t('header.cart')} /></div>
          <span>{itemCount} {t(itemCount === 1 ? 'common.item' : 'common.items')}</span>
        </div>
        <div className="cart-layout">
          <section className="cart-items" aria-label={t('cart.cartItems')}>
            {items.map((item) => (
              <article className="cart-item" key={item.productId}>
                <Link href={`/product/${item.productId}`}><a className="item-image"><img src={item.product.img_url} alt={item.product.name} /></a></Link>
                <div className="item-information">
                  <Link href={`/product/${item.productId}`}><a className="item-name">{item.product.name}</a></Link>
                  <p className="unit-price">{formatPrice(item.unitPrice)} {t('cart.each')}</p>
                  <div className="item-actions">
                    <div className="quantity" aria-label={t('product.quantityFor', { name: item.product.name })}>
                      <button type="button" onClick={() => setCartQuantity(item.productId, item.quantity - 1)} aria-label={t('cart.decrease')}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => setCartQuantity(item.productId, item.quantity + 1)} aria-label={t('cart.increase')}>+</button>
                    </div>
                    <button type="button" className="remove" onClick={() => removeCartProduct(item.productId)}>{t('cart.remove')}</button>
                  </div>
                </div>
                <strong className="line-total">{formatPrice(item.lineTotal)}</strong>
              </article>
            ))}
          </section>
          <aside className="summary">
            <p className="summary-eyebrow">{t('cart.summary')}</p>
            <div className="summary-row"><span>{t('cart.subtotal')}</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row muted"><span>{t('cart.shipping')}</span><span>{t('cart.calculatedLater')}</span></div>
            <div className="summary-total"><span>{t('common.total')}</span><strong>{formatPrice(subtotal)}</strong></div>
            <Link href="/checkout"><a className="checkout-button">{t('cart.checkout')}</a></Link>
            <Link href="/"><a className="continue-link">← {t('cart.continueShopping')}</a></Link>
          </aside>
        </div>
      </div>
      <style jsx>{`
        .cart-page { width: 100%; max-width: 1160px; }
        .cart-heading { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 26px; }
        .cart-heading :global(h1) { margin-top: 5px; }
        .cart-heading > span { color: var(--quantum-muted); font-size: 13px; }
        .eyebrow, .summary-eyebrow { margin: 0; color: var(--quantum-blue); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .cart-layout { display: grid; grid-template-columns: minmax(0, 1fr) 310px; align-items: start; gap: 28px; }
        .cart-items, .summary { border: 1px solid #edf0f5; border-radius: 12px; background: #ffffff; box-shadow: 0 10px 24px rgba(34,55,89,.06); }
        .cart-item { display: grid; grid-template-columns: 120px minmax(0, 1fr) auto; gap: 20px; align-items: center; padding: 22px; border-bottom: 1px solid #eef1f5; }
        .cart-item:last-child { border-bottom: 0; }
        .item-image { display: flex; align-items: center; justify-content: center; height: 112px; border-radius: 9px; background: #fafbfe; }
        .item-image img { width: 100%; height: 100%; object-fit: contain; }
        .item-name { color: var(--quantum-ink); font-size: 16px; font-weight: 800; line-height: 1.35; text-decoration: none; }
        .item-name:hover { color: var(--quantum-blue); }
        .unit-price { margin: 9px 0 17px; color: #8b94a3; font-size: 13px; }
        .item-actions { display: flex; align-items: center; gap: 18px; }
        .quantity { display: inline-flex; align-items: center; overflow: hidden; border: 1px solid #e0e5ec; border-radius: 9px; }
        .quantity button { width: 30px; height: 30px; border: 0; background: #ffffff; color: var(--quantum-blue); cursor: pointer; font-size: 18px; }
        .quantity span { min-width: 28px; color: #424b5c; font-size: 13px; text-align: center; }
        .remove { border: 0; background: transparent; color: #a0a8b4; cursor: pointer; font-size: 12px; }
        .remove:hover { color: #b54747; }
        .line-total { color: #424b5c; font-size: 15px; white-space: nowrap; }
        .summary { padding: 25px; position: sticky; top: 20px; }
        .summary-eyebrow { margin-bottom: 22px; color: #424b5c; }
        .summary-row, .summary-total { display: flex; justify-content: space-between; gap: 12px; padding: 12px 0; color: #596477; font-size: 14px; }
        .summary-row strong { color: #424b5c; }
        .summary-row.muted { color: #a0a8b4; font-size: 12px; }
        .summary-total { margin-top: 10px; padding: 18px 0; border-top: 1px solid #e9edf3; color: #424b5c; font-size: 16px; font-weight: 800; }
        .summary-total strong { font-size: 22px; }
        .checkout-button { display: flex; align-items: center; justify-content: center; min-height: 48px; margin-top: 10px; border-radius: 9px; background: var(--quantum-blue); color: #ffffff; font-size: 13px; font-weight: 800; text-decoration: none; transition: box-shadow .2s, transform .2s; }
        .checkout-button:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(24,117,240,.2); }
        .continue-link { display: block; margin-top: 18px; color: var(--quantum-blue); font-size: 12px; text-align: center; text-decoration: none; }
        @media (max-width: 850px) { .cart-layout { grid-template-columns: 1fr; } .summary { order: -1; } }
        @media (max-width: 560px) { .cart-item { grid-template-columns: 78px minmax(0, 1fr); gap: 14px; padding: 16px; } .item-image { height: 78px; } .line-total { grid-column: 2; } .item-actions { flex-wrap: wrap; gap: 10px; } .cart-heading { align-items: flex-start; flex-direction: column; gap: 8px; } }
      `}</style>
    </Page>
  );
}
