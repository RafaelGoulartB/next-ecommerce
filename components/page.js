import PageContainer from './page-container';
import Header from './header';
import Footer from './footer';

export default function Page({ title, description, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Header />

      {children}

      <Footer />
    </PageContainer>
  );
}
