import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import {
  CATEGORY_PRODUCT_SECTION,
  PRODUCTS,
  SEARCH_PRODUCT_SECTION,
  SORT_PRODUCT_SECTION,
} from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';
import LoadingPage from './loading-page';
import EmptySection from './emptySection';

export default function Products({ category }) {
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);
  const searchQueryResult = useQuery(SEARCH_PRODUCT_SECTION);
  const categoryQueryResult = useQuery(CATEGORY_PRODUCT_SECTION);
  const categoryName = Array.isArray(category) ? category[0] : category;
  const sort = sortQueryResult.data?.sortProductSection || ['rating', 'DESC'];
  const search = searchQueryResult.data?.searchProductSection || '';
  const selectedCategory = categoryQueryResult.data?.categoryProductSection || '';
  const activeCategory = selectedCategory || categoryName || null;
  const filtersReady =
    sortQueryResult.data &&
    searchQueryResult.data &&
    categoryQueryResult.data;
  const { data, loading, error } = useQuery(PRODUCTS, {
    variables: {
      field: sort[0],
      order: sort[1],
      category: activeCategory,
      search: search.trim() || null,
    },
    skip: !filtersReady,
  });

  if (
    loading ||
    sortQueryResult.loading ||
    searchQueryResult.loading ||
    categoryQueryResult.loading
  ) return <LoadingPage />;

  if (!data?.products || error) {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    const products = offlineProducts.filter((product) => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesSearch = !normalizedSearch || [product.name, product.description]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

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
