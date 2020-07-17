import Link from 'next/link';
import AsideCategories from './asideCategories';
import PromoCard from './promoCard';
import HeaderBarProducts from './headerBarProducts';
import EmptySection from './emptySection';

export default function ProductSection() {
  const product = null;

  return (
    <section id="product">
      <aside>
        <AsideCategories />
        <PromoCard />
      </aside>
      <div className="main">
        <HeaderBarProducts />
        {!product && <EmptySection />}
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
      `}</style>
    </section>
  );
}
