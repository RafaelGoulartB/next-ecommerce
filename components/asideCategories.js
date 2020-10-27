import CategoriesItem from './categoriesItem';
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../apollo/client/queries';

export default function AsideCategories() {
  const { data, loading, error } = useQuery(CATEGORIES);

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <ul className="categories">
      {data.categories.map((category) => {
        return <CategoriesItem key={category.id} category={category} />;
      })}

      <style jsx>{`
        .categories {
          width: 255px;
          max-width: 255px;
          background: #ffff;
          border-radius: 6px;
          margin-bottom: 30px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        @media (max-width: 1000px) {
          .categories {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}
