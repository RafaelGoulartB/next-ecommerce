import { sortProductSectionVar } from '../apollo/client/cache';
import { useQuery } from '@apollo/client';
import { FaTh, FaList } from 'react-icons/fa';
import { SORT_PRODUCT_SECTION } from '../apollo/client/queries';

export default function HeaderBarProducts({ viewMode = 'grid', onViewModeChange }) {
  const { data } = useQuery(SORT_PRODUCT_SECTION);
  const currentSort = data?.sortProductSection || ['rating', 'DESC'];

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
            currentSort[0] === 'rating' && currentSort[1] === 'DESC'
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
            currentSort[0] === 'price' && currentSort[1] === 'ASC'
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
            currentSort[0] === 'price' && currentSort[1] === 'DESC'
              ? 'active'
              : ''
          }
          onClick={handleHighPriceProductsClick}
        >
          High price
        </a>
      </div>
      <div className="view-switcher" role="group" aria-label="View mode">
        <button
          type="button"
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => onViewModeChange?.('grid')}
          aria-label="Show products in grid"
          aria-pressed={viewMode === 'grid'}
        >
          <FaTh size={13} />
        </button>
        <button
          type="button"
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => onViewModeChange?.('list')}
          aria-label="Show products in list"
          aria-pressed={viewMode === 'list'}
        >
          <FaList size={13} />
        </button>
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
        .header .sort-list a:hover { cursor: pointer; }
        .view-switcher {
          display: flex;
          align-items: stretch;
          align-self: stretch;
          border-left: 1px solid #edf0f5;
        }
        .view-switcher button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #b7c0cc;
          cursor: pointer;
          transition: color .2s, background .2s;
        }
        .view-switcher button + button { border-left: 1px solid #f1f3f7; }
        .view-switcher button:hover,
        .view-switcher button.active { color: var(--quantum-blue); background: #f7faff; }
        .view-switcher button:focus-visible { outline: 2px solid var(--quantum-blue); outline-offset: -2px; }
        @media (max-width: 850px) {
          .header {
            width: 100%;
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
          .view-switcher { display: none; }
        }
      `}</style>
    </div>
  );
}
