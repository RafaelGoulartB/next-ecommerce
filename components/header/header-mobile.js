import Logo from '../logo';
import ToggleDrawerButton from './toggle-drawer-button';

export default function HeaderMobile() {
  return (
    <div className="header-mobile">
      <ToggleDrawerButton />

      <Logo />
      <style jsx>{`
        .header-mobile {
          display: flex;
          align-items: center;
          padding: 18px 48px;
        }
        .header-mobile .drawer-menu {
          padding-right: 18px;
        }
        .header-mobile .drawer-menu .items .item a {
          text-decoration: none;
          color: #6666;
          font-weight: 500;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
