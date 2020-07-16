import Link from 'next/link';
import AsideCategories from './asideCategories';

export default function ProductSection() {
  return (
    <section id="product">
      <aside>
        <AsideCategories />
        <div className="promo-card">promo-card</div>
      </aside>
      <div className="main">
        <div className="header">header</div>
        <div className="products">products</div>
      </div>

      <style jsx>{`
        #product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
