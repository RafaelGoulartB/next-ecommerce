import { useRouter } from 'next/router';

import Page from '../../components/page';
import ProductSection from '../../components/productSection';
import LoadingPage from '../../components/loading-page';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  if (!router.isReady) {
    return (
      <Page>
        <LoadingPage />
      </Page>
    );
  }

  return (
    <Page>
      <ProductSection category={category} />
    </Page>
  );
}
