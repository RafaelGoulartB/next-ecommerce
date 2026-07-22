import Head from 'next/head';

export default function PageContainer({ title, description, children }) {
  return (
    <div className="container">
      <Head>
        <title>{title || 'Quantum  E-commerce - Next Project'}</title>
        {description !== false && (
          <meta
            name="description"
            content={
              description ||
              'Quantum E-commerce made with Next.js open-source project.'
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
