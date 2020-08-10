import Logo from '../logo';

export default function HeaderMobile() {
  return (
    <div className="header-mobile">
      <div className="menu">
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
      </div>

      <Logo />
      <style jsx>{`
        .header-mobile {
          display: flex;
          align-items: center;
          padding: 18px 48px;
        }
        .header-mobile .menu {
          padding-right: 18px;
        }
      `}</style>
    </div>
  );
}
