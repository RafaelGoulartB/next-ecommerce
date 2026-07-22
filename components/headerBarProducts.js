import { sortProductSectionVar } from '../apollo/client/cache';
import { useQuery } from '@apollo/client';
import { SORT_PRODUCT_SECTION } from '../apollo/client/queries';

export default function HeaderBarProducts() {
  const { data } = useQuery(SORT_PRODUCT_SECTION);

  function handlePopularProductsClick() {
    sortProductSectionVar(['rating', 'DESC']);
  }
  function handleLowPriceProductsClick() {
    sortProductSectionVar(['price', 'ASC']);
  }
  function handleHighPriceProductsClick() {
    sortProductSectionVar(['price', 'DESC']);
  }

  return (
    <div className="header">
      <div className="sort-list">
        <a
          id="popular-products"
          className={
            data.sortProductSection[0] === 'rating' &&
            data.sortProductSection[1] === 'DESC'
              ? 'active'
              : ''
          }
          onClick={handlePopularProductsClick}
        >
          Popular products
        </a>
        <a
          id="low-price"
          className={
            data.sortProductSection[0] === 'price' &&
            data.sortProductSection[1] === 'ASC'
              ? 'active'
              : ''
          }
          onClick={handleLowPriceProductsClick}
        >
          Low price
        </a>
        <a
          id="high-price"
          className={
            data.sortProductSection[0] === 'price' &&
            data.sortProductSection[1] === 'DESC'
              ? 'active'
              : ''
          }
          onClick={handleHighPriceProductsClick}
        >
          High price
        </a>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #ffffff;
          border: 1px solid #edf0f5;
          box-shadow: 0 8px 22px rgba(34, 55, 89, .05);
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .header .sort-list {
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .header .sort-list a {
          box-sizing: border-box;
          margin-left: 24px;
          padding: 16px 0;
          text-decoration: none;
          font-weight: bold;
          font-size: 13px;
          text-align: center;
          color: #9da6b3;
        }
        .header .sort-list a.active {
          color: #1875f0;
          border-bottom: 2px solid #1875f0;
        }
        .header .sort-list a:hover {
          cursor: pointer;
        }
        @media (max-width: 850px) {
          .header {
            width: 80vw;
            justify-content: center;
            align-items: center;
          }
          .header .sort-list {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: 24px;
            padding-right: 24px;
          }
          .header .sort-list a {
            font-size: 12px;
            margin-left: 0px;
          }
        }
      `}</style>
    </div>
  );
}
