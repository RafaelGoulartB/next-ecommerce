import Page from '../components/page';
import AlertError from '../components/alerts/error';
import HeaderBarProducts from '../components/headerBarProducts';
import Title from '../components/title';
import AsideCategories from '../components/asideCategories';

export default function Profile() {
  return (
    <Page>
      <Title title="Wishlist" />
      <section className="wishlist">
        <div className="main">
          <HeaderBarProducts />
          <p>Products in Wishlist</p>
        </div>
        <aside>
          <AsideCategories />
        </aside>
      </section>
      <style jsx>{`
        .wishlist {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .wishlist .main {
          flex-grow: 1;
          padding-right: 30px;
        }
      `}</style>
    </Page>
  );
}
