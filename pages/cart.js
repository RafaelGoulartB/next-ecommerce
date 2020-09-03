import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import FinishOrderCart from '../components/finishOrderCart';
import ProductItem from '../components/productItem';
import { CART, PRODUCTS_BY_IDS } from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';

export default function Profile() {
  const cart = useQuery(CART);

  const { data, loading, error } = useQuery(PRODUCTS_BY_IDS, {
    variables: {
      id: cart.data.cart.products,
    },
  });

  if (loading) return <></>;

  if (error)
    return (
      <Page>
        <Title title="Cart" />
        <EmptySection name="cart" />
      </Page>
    );

  return (
    <Page>
      <Title title="Cart" />
      <section className="cart">
        <aside>{data.productsById.length != 0 && <FinishOrderCart />}</aside>
        <div className="main">
          {!data?.productsById.length && <EmptySection name="cart" />}
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
        .cart {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .cart .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        .cart aside {
          max-width: 280px;
        }

        @media (max-width: 1100px) {
          .cart {
            flex-direction: column;
            justify-content: space-between;
          }
          .cart aside {
            flex-grow: 1;
            max-width: 100%;
          }
          .cart .main {
            padding-left: 0px;
          }
        }
      `}</style>
    </Page>
  );
}
