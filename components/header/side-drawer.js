import Link from 'next/link';
import SearchBox from '../search-box';

export default function SideDrawer({ closeDrawer, show }) {
  return (
    <div className={`side-drawer ${show ? 'show' : 'hide'}`} id="side-drawer">
      <button className="close-drawer" onClick={closeDrawer}>
        X
      </button>

      <div className="search">
        <SearchBox />
      </div>

      <ul className="items">
        <li id="home" className="item">
          <Link href="/cart">
            <a>Items</a>
          </Link>
        </li>
        <li id="about" className="item">
          <Link href="/wishlist">
            <a>Wishlist</a>
          </Link>
        </li>
        <li id="contact" className="item">
          <Link href="/user/login">
            <a>Sign In</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .side-drawer {
          display: flex;
          flex-direction: column;
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          width: 80%;
          height: 100vh;
          background: #fff;
          box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }
        .side-drawer.show {
          transform: translateX(0);
        }
        .side-drawer .search {
          padding-top: 1rem;
          width: 80%;
          align-self: center;
        }
        .side-drawer .items {
          padding-top: 3rem;
          box-sizing: border-box;
          width: 100%;
        }
        .side-drawer .items .item + .item {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #6666;
        }
        .side-drawer .items .item a {
          padding-left: 4rem;
          color: #4d4d4d;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.2rem;
          transition: opacity 0.4s;
        }
        .side-drawer .items .item a:hover,
        .side-drawer .items .item a:active {
          opacity: 0.8;
        }
        .side-drawer .close-drawer {
          width: 100%;
          padding: 1.2rem 2rem;
          text-align: right;
          background: none;
          border: none;
          font-size: 1.8rem;
          font-weight: 500;
          color: #4d4d4d;
          transition: opacity 0.2s;
        }
        .side-drawer .close-drawer:hover {
          opacity: 0.8;
        }
        .side-drawer .close-drawer:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
