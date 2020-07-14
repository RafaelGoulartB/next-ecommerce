import PageContainer from './page-container';
import Header from './header';
import Footer from './footer';

export default function Page({ title, description, viewer, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Header viewer={viewer} />

      <div className="content">{children}</div>

      <Footer />
      <style jsx>{`
        .content {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 80%;
        }
      `}</style>
    </PageContainer>
  );
}
