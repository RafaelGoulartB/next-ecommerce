import PageContainer from './page-container';
import Header from './header';
import Footer from './footer';

export default function Page({ title, description, viewer, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Header viewer={viewer} />

      {children}

      <Footer />
    </PageContainer>
  );
}
