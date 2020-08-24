import { useState } from 'react';
import Logo from '../logo';
import OpenDrawerButton from './open-drawer-button';
import SideDrawer from './side-drawer';

export default function HeaderMobile({ viewer }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="header-mobile">
      <OpenDrawerButton openDrawer={toggleDrawer} />

      <SideDrawer closeDrawer={toggleDrawer} show={isDrawerOpen} />

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
