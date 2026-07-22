import Head from 'next/head';
import useLocale from '../hooks/use-locale';

export default function PageContainer({ title, description, children }) {
  const { t } = useLocale();
  return (
    <div className="container">
      <Head>
        <title>{title || t('meta.defaultTitle')}</title>
        {description !== false && (
          <meta
            name="description"
            content={
              description || t('meta.description')
            }
          />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <style jsx>{`
        main {
          display: flex;
          min-height: 100vh;
          background-color: var(--quantum-background);
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          font-family: Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}
