import { useState } from 'react';
import AsideCategories from './asideCategories';
import PromoCard from './promoCard';
import HeaderBarProducts from './headerBarProducts';
import Products from './products';
import ProductShowcase from './productShowcase';

export default function ProductSection({ category, showShowcase = false }) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <section className="product-section">
      {showShowcase && <ProductShowcase />}
      <div id="product">
        <aside>
          <AsideCategories />
          <PromoCard />
        </aside>
        <div className="main">
          <HeaderBarProducts viewMode={viewMode} onViewModeChange={setViewMode} />
          <Products category={category} viewMode={viewMode} />
        </div>
      </div>

      <style jsx>{`
        .product-section {
          width: 100%;
        }
        #product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          align-items: flex-start;
        }
        #product .main {
          flex-grow: 1;
          padding-left: 26px;
          min-width: 0;
        }
        @media (max-width: 900px) {
          #product .main {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
