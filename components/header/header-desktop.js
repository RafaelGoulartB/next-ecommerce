import { useQuery } from '@apollo/client';
import Link from 'next/link';
import {
  FaShoppingCart,
  FaRegHeart,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import { GUEST_CART, MY_CART } from '../../apollo/client/queries';

import Logo from '../logo';
import SearchBox from '../search-box';
import CurrencySelector from '../currency-selector';

export default function HeaderDesktop({ viewer }) {
  const { data: guestCartData } = useQuery(GUEST_CART);
  const { data: myCartData } = useQuery(MY_CART, { skip: !viewer });
  const cartCount = viewer
    ? myCartData?.myCart?.itemCount || 0
    : guestCartData?.guestCart?.itemCount || 0;

  return (
    <>
      <div className="header header-top">
        <Logo />

        <SearchBox />

        <div className="nav-buttons">
          <Link href="/cart">
            <a className="nav-buttons-items">
              <FaShoppingCart color="#808080" />
              <p>
                <sup className="items-total">{cartCount}</sup>{' '}
                Items
              </p>
            </a>
          </Link>
          <Link href="/wishlist">
            <a className="nav-buttons-wishlist">
              <FaRegHeart color="#808080" />
              <p>Wishlist</p>
            </a>
          </Link>
          {!viewer && (
            <Link href="/user/login">
              <a className="nav-buttons-signin">
                <FaUser color="#808080" />
                <p>Sign In</p>
              </a>
            </Link>
          )}
          {viewer && (
            <>
              <Link href="/profile">
                <a className="nav-buttons-profile">
                  <FaUser color="#808080" />
                  <p>{viewer.name}</p>
                </a>
              </Link>
              <Link href="/user/signout">
                <a className="nav-buttons-signout">
                  <FaSignOutAlt />
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="header header-bottom">
        <div className="all-categories-box">
          <FaBars color="#d8d8d8" />
          <select name="categories" id="categories" defaultValue="All Categories">
            <option value="All Categories">
              All Categories
            </option>
            <option value="#">Desktop</option>
            <option value="#">Smartphone</option>
            <option value="#">Watches</option>
            <option value="#">Games</option>
            <option value="#">Laptop</option>
            <option value="#">Keyboards</option>
            <option value="#">TV & Video</option>
            <option value="#">Accessories</option>
          </select>
        </div>

        <nav className="main-nav">
          <Link href="#">
            <a>Super Deals</a>
          </Link>
          <Link href="#">
            <a>Featured Brands</a>
          </Link>
          <Link href="#">
            <a>Collections</a>
          </Link>
          <Link href="#">
            <a>Bestselling</a>
          </Link>
        </nav>

        <div className="settings">
          <div className="menu-dropdown">
            <p>Help</p>
          </div>
          <div className="menu-dropdown">
            <CurrencySelector />
          </div>
          <div className="menu-dropdown">
            <p>Language</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Header Top */
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: min(90%, 1240px);
          margin: 0 auto;
          padding: 22px 0;
        }
        .nav-buttons {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .nav-buttons a {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 7px;
          margin-left: 22px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          color: var(--quantum-text);
          transition: color .2s;
        }
        .nav-buttons .items-total {
          font-size: 12px;
          align-self: flex-end;
        }
        .nav-buttons .nav-buttons-signout {
          margin-left: 12px;
        }
        .nav-buttons a:hover {
          color: var(--quantum-blue);
        }
        .nav-buttons a p {
          margin-left: 8px;
        }
        /* Header Bottom */
        .header-bottom {
          width: 100%;
          max-width: none;
          padding: 0 max(5%, calc((100% - 1240px) / 2));
          border-top: 1px solid #f0f3f7;
        }
        .header-bottom .all-categories-box {
          height: 100%;
          display: flex;
          align-items: center;
          /* Border */
          border-right: 1px solid #f0f3f7;
          padding: 15px 48px 15px 0;
        }
        .header-bottom .all-categories-box select {
          height: 100%;
          padding-left: 15px;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 60px;
          color: var(--quantum-text);
          border: none;
          background: none;
        }
        .header-bottom .all-categories-box select:focus {
          outline: none;
        }
        .header-bottom .main-nav {
          display: flex;
          align-items: center;
        }
        .header-bottom .main-nav a {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: var(--quantum-text);
          text-decoration: none;
          margin-left: 14px;
          margin-right: 14px;
          transition: color .2s;
        }
        .header-bottom .main-nav a:hover { color: var(--quantum-blue); }
        .header-bottom .settings {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .header-bottom .settings .menu-dropdown {
          /* Border */
          border-left: 1px solid #f0f3f7;
          padding: 15px 18px;
        }
        .header-bottom .settings .menu-dropdown p {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: var(--quantum-muted);
        }
        @media (max-width: 1180px) { .header-bottom .main-nav a { margin-left: 8px; margin-right: 8px; } .header-bottom .settings .menu-dropdown { padding-left: 10px; padding-right: 10px; } }
        @media (max-width: 1000px) { .header { width: 90%; } }
      `}</style>
    </>
  );
}
