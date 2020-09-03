import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import AsideCategories from '../components/asideCategories';
import { WISHLIST, PRODUCTS_BY_IDS } from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';
import ProductItem from '../components/productItem';

export default function Wishlist() {
  const wishlist = useQuery(WISHLIST);

  const { data, loading, error } = useQuery(PRODUCTS_BY_IDS, {
    variables: {
      id: wishlist.data.wishlist.products,
    },
  });

  if (loading) return <></>;

  if (error || !data?.productsById.length)
    return (
      <Page>
        <Title title="Wishlist" />
        <EmptySection name="wishlist" />
      </Page>
    );

  return (
    <Page>
      <Title title="Wishlist" />
      <section className="wishlist">
        <aside>
          <AsideCategories />
        </aside>
        <div className="main">
          <ProductsGrid>
            {data?.productsById.map((product) => (
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
      <style jsx>{`
        .wishlist {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .wishlist .main {
          flex-grow: 1;
          padding-left: 30px;
        }
      `}</style>
    </Page>
  );
}
