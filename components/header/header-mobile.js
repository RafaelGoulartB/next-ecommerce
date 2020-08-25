import { isDrawerOpen } from '../../apollo/client/cache';

import Logo from '../logo';
import OpenDrawerButton from './open-drawer-button';
import SideDrawer from './side-drawer';

export default function HeaderMobile({ viewer }) {
  const toggleDrawer = () => {
    isDrawerOpen(!isDrawerOpen())
    console.log(isDrawerOpen());
  };

  return (
    <div className="header-mobile">
      <OpenDrawerButton openDrawer={toggleDrawer} />

      <SideDrawer closeDrawer={toggleDrawer} />

      <Logo />

      <style jsx>{`
        .header-mobile {
          display: flex;
          align-items: center;
          padding: 18px 48px;
        }
      `}</style>
    </div>
  );
}
