import Page from '../components/page';
import AlertError from '../components/alerts/error';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import HeaderBarProducts from '../components/headerBarProducts';
import FinishOrderCart from '../components/finishOrderCart';

export default function Profile() {
  const product = null;

  return (
    <Page>
      <Title title="Cart" />
      <section className="cart">
        <div className="main">
          <HeaderBarProducts />
          {!product && <EmptySection />}
        </div>
        <aside>{product && <FinishOrderCart />}</aside>
      </section>

      <style jsx>{`
        .cart {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .cart .main {
          flex-grow: 1;
          padding-right: 30px;
        }

        @media (max-width: 1100px) {
          .cart {
            flex-direction: column-reverse;
            justify-content: space-between;
          }
          .cart aside {
            flex-grow: 1;
          }
          .cart .main {
            padding-right: 0px;
          }
        }
      `}</style>
    </Page>
  );
}
