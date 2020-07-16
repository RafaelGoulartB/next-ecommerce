import Link from 'next/link';
import {
  MdDesktopWindows,
  MdDesktopMac,
  MdLaptop,
  MdKeyboard,
  MdMemory,
  MdSpeaker,
  MdSmartphone,
  MdTv,
  MdVideogameAsset,
  MdWatch,
  MdKeyboardArrowRight,
} from 'react-icons/md';

export default function AsideCategories() {
  return (
    <ul className="categories">
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdDesktopWindows color="#D8D8D8" size="22" />
              </div>
              <p>Computers</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdDesktopMac color="#D8D8D8" size="22" />
              </div>
              <p>Apple Computers</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdLaptop color="#D8D8D8" size="22" />
              </div>
              <p>Laptop</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdKeyboard color="#D8D8D8" size="22" />
              </div>
              <p>Keyboards</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdMemory color="#D8D8D8" size="22" />
              </div>
              <p>Computer Components</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdSpeaker color="#D8D8D8" size="22" />
              </div>
              <p>Accessories</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdSmartphone color="#D8D8D8" size="22" />
              </div>
              <p>Cell Phone</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdTv color="#D8D8D8" size="22" />
              </div>
              <p>TV & Video</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdVideogameAsset color="#D8D8D8" size="22" />
              </div>
              <p>Game Console</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <div className="content">
              <div className="icon">
                <MdWatch color="#D8D8D8" size="22" />
              </div>
              <p>Watches</p>
            </div>
            <div className="arrow-button">
              <MdKeyboardArrowRight color="#D8D8D8" size="26" />
            </div>
          </a>
        </Link>
      </li>

      <style jsx>{`
        .categories {
          width: 255px;
          max-width: 255px;
          background: #ffff;
          border-radius: 6px;
          margin-bottom: 30px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        .categories li a {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 18px;
          text-decoration: none;
          font-weight: 500;
          font-size: 13px;
          color: #808080;
          border-bottom: 2px solid #f5f5f5;
          transition: 0.4s;
        }
        .categories li a:hover {
          background: #f2f2f2;
        }
        .categories li a .content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .categories li a .content .icon {
          padding-right: 18px;
        }
        .categories li a .arrow-button {
          align-self: flex-end;
        }
        @media (max-width: 850px) {
          .categories {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}
