import { useQuery } from '@apollo/react-hooks';
import { PRODUCTS } from '../apollo/queries';

import AsideCategories from './asideCategories';
import PromoCard from './promoCard';
import HeaderBarProducts from './headerBarProducts';
import EmptySection from './emptySection';
import ProductItem from './productItem';

export default function ProductSection() {
  const { data, loading, error } = useQuery(PRODUCTS);

  if (loading) return <></>;

  if (error) return <EmptySection />;

  return (
    <section id="product">
      <aside>
        <AsideCategories />
        <PromoCard />
      </aside>
      <div className="main">
        <HeaderBarProducts />
        {!data.products && <EmptySection />}
        <div className="products-grid">
          {data.products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              rating={product.rating}
              img_url={product.img_url}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        #product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        #product .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        #product .main .products-grid {
          display: grid;
          grid-gap: 28px;
          grid: auto-flow / 1fr 1fr 1fr;
        }
        @media (min-width: 1650px) {
          #product .main .products-grid {
            grid: auto-flow / 1fr 1fr 1fr 1fr;
          }
        }
        @media (max-width: 1360px) {
          #product .main .products-grid {
            grid: auto-flow / 1fr 1fr;
          }
        }
        @media (max-width: 900px) {
          #product .main {
            padding-left: 0;
          }
        }
        @media (max-width: 700px) {
          #product .main .products-grid {
            grid: auto-flow / 1fr;
          }
        }
      `}</style>
    </section>
  );
}
