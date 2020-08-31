import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import EmptySection from './emptySection';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';

export default function Products() {
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);

  const { data, loading, error } = useQuery(PRODUCTS, {
    variables: {
      field: sortQueryResult.data.sortProductSection[0],
      order: sortQueryResult.data.sortProductSection[1],
    },
  });

  if (loading) return <></>;

  if (error) return <EmptySection />;

  if (!data.products) return <EmptySection />;

  return (
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
      <style jsx>{`
        .products-grid {
          display: grid;
          grid-gap: 28px;
          grid: auto-flow / 1fr 1fr 1fr;
        }
        @media (min-width: 1650px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr 1fr 1fr;
          }
        }
        @media (max-width: 1360px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr;
          }
        }
        @media (max-width: 700px) {
          .products-grid {
            grid: auto-flow / 1fr;
          }
        }
      `}</style>
    </div>
  );
}
