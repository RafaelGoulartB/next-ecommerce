import Head from 'next/head';
import Link from 'next/link';

export default function AuthLayout({ title, eyebrow, heading, children }) {
  return (
    <div className="auth-page">
      <Head>
        <title>{title} - Quantum E-commerce</title>
        <meta
          name="description"
          content="Sign in to manage your Quantum E-commerce account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="auth-shell">
        <section className="brand-panel" aria-label="Quantum account benefits">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <Link href="/">
            <a className="brand-logo">Quantum</a>
          </Link>
          <div className="brand-copy">
            <p className="brand-eyebrow">Your smarter shopping space</p>
            <h1>Everything you love, in one place.</h1>
            <p className="brand-description">
              Keep your shopping experience simple, personal and always ready
              when you are.
            </p>
            <ul className="benefits">
              <li><span>01</span>Track your orders</li>
              <li><span>02</span>Save your favorite products</li>
              <li><span>03</span>Share your product experience</li>
            </ul>
          </div>
          <p className="brand-footer">Designed for better everyday choices.</p>
        </section>

        <section className="form-panel">
          <div className="form-content">
            <p className="form-eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
            {children}
          </div>
        </section>
      </main>

      <p className="back-to-shop">
        <Link href="/"><a>← Back to shop</a></Link>
      </p>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          box-sizing: border-box;
          padding: 42px 24px;
          background: #f7f9fc;
          color: #252b3a;
          font-family: Roboto, sans-serif;
        }
        .auth-shell {
          display: grid;
          grid-template-columns: minmax(320px, 0.9fr) minmax(420px, 1.1fr);
          width: min(1080px, 100%);
          min-height: 650px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 24px 70px rgba(34, 55, 89, 0.13);
        }
        .brand-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          overflow: hidden;
          padding: 46px 48px;
          background: linear-gradient(145deg, #1268e5 0%, #1875f0 48%, #5b8fff 100%);
          color: #ffffff;
        }
        .brand-logo {
          position: relative;
          z-index: 1;
          color: #ffffff;
          font-size: 23px;
          font-weight: 900;
          letter-spacing: 2px;
          text-decoration: none;
          text-transform: uppercase;
        }
        .brand-copy {
          position: relative;
          z-index: 1;
          margin: auto 0;
        }
        .brand-eyebrow,
        .form-eyebrow {
          margin: 0 0 16px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }
        .brand-eyebrow { color: rgba(255, 255, 255, 0.72); }
        .brand-copy h1 {
          max-width: 340px;
          margin: 0;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 900;
          letter-spacing: -1.8px;
          line-height: 1.03;
        }
        .brand-description {
          max-width: 330px;
          margin: 24px 0 34px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 15px;
          line-height: 1.7;
        }
        .benefits {
          display: grid;
          gap: 14px;
          margin: 0;
          padding: 0;
          list-style: none;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        }
        .benefits li {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .benefits span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 27px;
          height: 27px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.78);
          font-size: 10px;
        }
        .brand-footer {
          position: relative;
          z-index: 1;
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }
        .glow {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }
        .glow-one { width: 290px; height: 290px; right: -145px; top: 80px; }
        .glow-two { width: 190px; height: 190px; left: -95px; bottom: -36px; }
        .form-panel {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 56px clamp(34px, 7vw, 92px);
          background: #ffffff;
        }
        .form-content { width: 100%; max-width: 390px; margin: 0 auto; }
        .form-eyebrow { color: #1875f0; }
        .form-content h2 {
          margin: 0 0 32px;
          color: #252b3a;
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -1.2px;
        }
        .back-to-shop {
          margin: 20px 0 0;
          text-align: center;
          font-size: 13px;
        }
        .back-to-shop a { color: #7d8799; text-decoration: none; }
        .back-to-shop a:hover { color: #1875f0; }
        @media (max-width: 760px) {
          .auth-page { padding: 16px; }
          .auth-shell { display: block; min-height: 0; border-radius: 18px; }
          .brand-panel { min-height: 255px; padding: 28px 26px; }
          .brand-copy { margin: 36px 0 0; }
          .brand-copy h1 { max-width: 500px; font-size: 34px; }
          .brand-description { margin: 14px 0 18px; font-size: 13px; }
          .benefits { display: flex; flex-wrap: wrap; gap: 10px 18px; font-size: 12px; }
          .benefits li { gap: 7px; }
          .benefits span { width: 22px; height: 22px; }
          .brand-footer { display: none; }
          .form-panel { padding: 38px 24px 42px; }
          .form-content h2 { font-size: 32px; }
        }
      `}</style>
    </div>
  );
}
