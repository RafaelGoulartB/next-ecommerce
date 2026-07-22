import CategoriesItem from './categoriesItem';
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../apollo/client/queries';
import offlineCategories from '../db/offlineData/categories';

export default function AsideCategories() {
  const { data, loading, error } = useQuery(CATEGORIES);

  if (loading) return <></>;

  // Offline data
  if (!data?.categories || error)
    return (
      <ul className="categories">
        {offlineCategories.map((category) => {
          return <CategoriesItem key={category.id} category={category} />;
        })}

        <style jsx>{`
          .categories {
            width: 250px;
            max-width: 250px;
            background: var(--quantum-surface);
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 10px 26px rgba(34, 55, 89, .07);
            overflow: hidden;
          }
          @media (max-width: 1000px) {
            .categories {
              display: none;
            }
          }
        `}</style>
      </ul>
    );

  return (
    <ul className="categories">
      {data.categories.map((category) => {
        return <CategoriesItem key={category.id} category={category} />;
      })}

      <style jsx>{`
        .categories {
          width: 250px;
          max-width: 250px;
          background: var(--quantum-surface);
          border-radius: 12px;
          margin-bottom: 30px;
          box-shadow: 0 10px 26px rgba(34, 55, 89, .07);
          overflow: hidden;
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
