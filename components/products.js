import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';
import LoadingPage from './loading-page';

export default function Products({ category }) {
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);

  if (category) {
    var { data, loading, error } = useQuery(PRODUCTS, {
      variables: {
        field: sortQueryResult.data.sortProductSection[0],
        order: sortQueryResult.data.sortProductSection[1],
        category: category,
      },
    });
  } else if (!category) {
    var { data, loading, error } = useQuery(PRODUCTS, {
      variables: {
        field: sortQueryResult.data.sortProductSection[0],
        order: sortQueryResult.data.sortProductSection[1],
      },
    });
  }

  if (loading) {
    return <LoadingPage />
  }

  // Offline data
  if (!data?.products || error)
    return (
      <ProductsGrid>
        {offlineProducts.map((product) => (
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
    );

  // if (error) return <EmptySection />;

  // if (!data.products) return <EmptySection />;

  return (
    <ProductsGrid>
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
    </ProductsGrid>
  );
}
