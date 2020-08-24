import PageContainer from './page-container';
import Header from './header';
import Footer from './footer';

export default function Page({ title, description, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Header />

      <div className="content">{children}</div>

      <Footer />
      <style jsx>{`
        .content {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 80%;
          max-width: 1700px;
        }
      `}</style>
    </PageContainer>
  );
}
