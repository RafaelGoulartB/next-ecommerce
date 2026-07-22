import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';
import LoadingPage from './loading-page';
import EmptySection from './emptySection';

export default function Products({ category }) {
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);
  const categoryName = Array.isArray(category) ? category[0] : category;
  const sort = sortQueryResult.data?.sortProductSection || ['rating', 'DESC'];
  const { data, loading, error } = useQuery(PRODUCTS, {
    variables: {
      field: sort[0],
      order: sort[1],
      category: categoryName || null,
    },
    skip: !sortQueryResult.data,
  });

  if (loading || sortQueryResult.loading) return <LoadingPage />;

  if (!data?.products || error) {
    const products = categoryName
      ? offlineProducts.filter((product) => product.category === categoryName)
      : offlineProducts;

    if (!products.length) return <EmptySection />;

    return (
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
    );
  }

  if (!data.products.length) return <EmptySection />;

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
