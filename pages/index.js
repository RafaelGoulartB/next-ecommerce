import Warning from '../components/alerts/warnig';
import Page from '../components/page';
import ProductSection from '../components/productSection';
import useLocale from '../hooks/use-locale';

export default function Index() {
  const { t } = useLocale();
  return (
    <Page>
      {process.env.NODE_ENV === 'production' && (
        <Warning message={t('home.warning')} />
      )}
      <ProductSection showShowcase />
    </Page>
  );
}
