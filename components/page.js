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
          box-sizing: border-box;
          width: min(90%, 1240px);
          max-width: 1240px;
          padding: 8px 0 28px;
        }
        @media (max-width: 700px) { .content { width: 90%; padding-top: 0; } }
      `}</style>
    </PageContainer>
  );
}
