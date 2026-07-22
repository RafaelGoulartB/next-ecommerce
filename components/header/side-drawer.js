import Link from 'next/link';
import { useQuery } from '@apollo/client';
import SearchBox from '../search-box';
import { GET_DRAWER_STATE, GUEST_CART, MY_CART } from '../../apollo/client/queries';

export default function SideDrawer({ closeDrawer, viewer }) {
  const { data } = useQuery(GET_DRAWER_STATE);
  const { data: guestCartData } = useQuery(GUEST_CART);
  const { data: myCartData } = useQuery(MY_CART, { skip: !viewer });
  const itemCount = viewer
    ? myCartData?.myCart?.itemCount || 0
    : guestCartData?.guestCart?.itemCount || 0;

  return (
    <div className={`side-drawer ${data?.isDrawerOpen ? 'show' : 'hide'}`} id="side-drawer">
      <button className="close-drawer" onClick={closeDrawer} aria-label="Close menu">×</button>
      <div className="search"><SearchBox /></div>
      <ul className="items">
        <li className="item"><Link href="/cart"><a onClick={closeDrawer}>Cart <span>{itemCount}</span></a></Link></li>
        <li className="item"><Link href="/wishlist"><a onClick={closeDrawer}>Wishlist</a></Link></li>
        {viewer ? (
          <>
            <li className="item"><Link href="/profile"><a onClick={closeDrawer}>{viewer.name}</a></Link></li>
            <li className="item"><Link href="/user/signout"><a onClick={closeDrawer}>Sign Out</a></Link></li>
          </>
        ) : (
          <li className="item"><Link href="/user/login"><a onClick={closeDrawer}>Sign In</a></Link></li>
        )}
      </ul>
      <style jsx>{`
        .side-drawer { display: flex; flex-direction: column; position: fixed; z-index: 999; top: 0; left: 0; width: 80%; height: 100vh; box-sizing: border-box; background: #fff; box-shadow: 2px 0 5px rgba(0,0,0,.18); transform: translateX(-100%); transition: transform .3s ease-out; }
        .side-drawer.show { transform: translateX(0); }
        .search { padding-top: 1rem; width: 80%; align-self: center; }
        .items { width: 100%; padding-top: 2rem; box-sizing: border-box; }
        .item + .item { margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid #eeeeee; }
        .item a { display: flex; justify-content: space-between; padding: 0 2.4rem; color: #4d4d4d; text-decoration: none; font-size: 1.05rem; font-weight: 700; }
        .item a span { color: #1875f0; }
        .close-drawer { width: 100%; padding: 1rem 2rem; border: 0; background: none; color: #4d4d4d; cursor: pointer; font-size: 2rem; text-align: right; }
      `}</style>
    </div>
  );
}
