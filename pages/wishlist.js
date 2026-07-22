import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import AsideCategories from '../components/asideCategories';
import ProductsGrid from '../components/productsGrid';
import ProductItem from '../components/productItem';
import LoadingPage from '../components/loading-page';
import { GUEST_WISHLIST, MY_WISHLIST, PRODUCTS_BY_IDS, VIEWER } from '../apollo/client/queries';
import useLocale from '../hooks/use-locale';

export default function Wishlist() {
  const { t } = useLocale();
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: guestData, loading: guestLoading } = useQuery(GUEST_WISHLIST);
  const { data: wishlistData, loading: wishlistLoading } = useQuery(MY_WISHLIST, { skip: !viewer });
  const guestIds = guestData?.guestWishlist?.products || [];
  const { data: guestProductsData, loading: guestProductsLoading } = useQuery(PRODUCTS_BY_IDS, {
    variables: { id: guestIds },
    skip: Boolean(viewer) || !guestIds.length,
  });

  const loading = viewerLoading || guestLoading || (viewer ? wishlistLoading : guestProductsLoading);
  if (loading) return <Page><LoadingPage /></Page>;

  const products = viewer ? wishlistData?.myWishlist || [] : guestProductsData?.productsById || [];
  if (!products.length) {
    return (
      <Page>
        <Title title={t('header.wishlist')} />
        <EmptySection name={t('header.wishlist').toLowerCase()} />
      </Page>
    );
  }

  return (
    <Page title={`${t('header.wishlist')} - ${t('common.siteName')}`}>
      <div className="wishlist-page">
        <div className="wishlist-heading">
          <div><p className="eyebrow">{t('header.wishlist')}</p><Title title={t('header.wishlist')} /></div>
          <span>{products.length} {t(products.length === 1 ? 'common.product' : 'common.products')}</span>
        </div>
        <section className="wishlist">
          <aside><AsideCategories /></aside>
          <div className="main">
            <ProductsGrid>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  rating={product.rating}
                  img_url={product.img_url}
                  price={product.price}
                />
              ))}
            </ProductsGrid>
          </div>
        </section>
      </div>
      <style jsx>{`
        .wishlist-page { width: 100%; }
        .wishlist-heading { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 26px; }
        .wishlist-heading :global(h1) { margin-top: 5px; }
        .wishlist-heading span { color: var(--quantum-muted); font-size: 13px; }
        .eyebrow { margin: 0; color: var(--quantum-blue); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .wishlist { display: flex; flex-direction: row; justify-content: space-between; width: 100%; }
        .wishlist .main { flex-grow: 1; padding-left: 30px; }
        @media (max-width: 900px) { .wishlist { display: block; } .wishlist aside { display: none; } .wishlist .main { padding-left: 0; } }
        @media (max-width: 560px) { .wishlist-heading { align-items: flex-start; flex-direction: column; gap: 8px; } }
      `}</style>
    </Page>
  );
}
