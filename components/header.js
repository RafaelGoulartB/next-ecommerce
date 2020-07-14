import Link from 'next/link';
import {
  FaShoppingCart,
  FaRegHeart,
  FaUser,
  FaSearch,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';

export default function Header({ viewer }) {
  return (
    <header>
      <div className="header header-top">
        <Link href="/">
          <a className="logo">Quantum</a>
        </Link>

        <div className="search-box">
          <button className="search-button">
            <FaSearch color="#D8D8D8" size="15px" />
          </button>
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search goods"
          />
          <select id="categories-search" name="categories-search">
            <option value="" selected>
              Category
            </option>
            <option value="DB">DB</option>
          </select>
        </div>

        <div className="nav-buttons">
          <Link href="/">
            <a className="nav-buttons-items">
              <FaShoppingCart color="#808080" />
              <p>Items</p>
            </a>
          </Link>
          <Link href="/">
            <a className="nav-buttons-wishlist">
              <FaRegHeart color="#808080" />
              <p>Wishlist</p>
            </a>
          </Link>
          {!viewer && (
            <Link href="/login">
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
              <Link href="/signout">
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
          <select name="categories" id="categories">
            <option value="All Categories" selected>
              All Categories
            </option>
            <option value="DB">DB</option>
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
            <p>USD</p>
          </div>
          <div className="menu-dropdown">
            <p>Language</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Header Top */
        header {
          width: 100vw;
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
          background-color: #ffffff;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        header .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 28px 10vw;
        }
        header .header-top .logo {
          font-style: normal;
          font-weight: 900;
          font-size: 22px;
          line-height: 60px;
          letter-spacing: 1.65px;
          text-transform: uppercase;
          color: #4d4d4d;
          text-decoration: none;
        }
        header .search-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 12px;
          padding-right: 12px;
          height: 42px;
          background: #ffffff;
          border: 2px solid #f5f5f5;
          box-sizing: border-box;
          border-radius: 4px;
        }
        header .search-box .search-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          height: 100%;
        }
        header .search-box .search-button:focus {
          outline: none;
        }
        header .search-box .search-button:hover {
          opacity: 40%;
        }
        header .search-box input {
          width: 210px;

          height: 100%;
          border: none;
          padding-left: 8px;
        }
        header .search-box input:focus {
          outline: none;
        }
        header .search-box select {
          height: 100%;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 1px;
          color: #b2b2b2;
          border: none;
          background: none;
        }
        header .search-box select:focus {
          outline: none;
        }
        header .nav-buttons {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        header .nav-buttons a {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 32px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          color: #808080;
        }
        header .nav-buttons .nav-buttons-signout {
          margin-left: 12px;
        }
        header .nav-buttons a:hover {
          text-decoration: underline;
        }
        header .nav-buttons a p {
          margin-left: 8px;
        }
        /* Header Bottom */
        header .header-bottom {
          padding: 0px 10vw;
          border-top: 2px solid #f5f5f5;
        }
        header .header-bottom .all-categories-box {
          height: 100%;
          display: flex;
          align-items: center;
          /* Border */
          border-right: 2px solid #f5f5f5;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-right: 48px;
        }
        header .header-bottom .all-categories-box select {
          height: 100%;
          padding-left: 15px;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 60px;
          color: #808080;
          border: none;
          background: none;
        }
        header .header-bottom .all-categories-box select:focus {
          outline: none;
        }
        header .header-bottom .main-nav {
          display: flex;
          align-items: center;
        }
        header .header-bottom .main-nav a {
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: #666666;
          text-decoration: none;
          margin-left: 16px;
          margin-right: 16px;
        }
        header .header-bottom .main-nav a:hover {
          text-decoration: underline;
        }
        header .header-bottom .settings {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        header .header-bottom .settings .menu-dropdown {
          /* Border */
          border-left: 2px solid #f5f5f5;
          padding: 20px 24px;
        }
        header .header-bottom .settings .menu-dropdown p {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: #b3b3b3;
        }
      `}</style>
    </header>
  );
}
