import Link from 'next/link';

export default function HeaderBarProducts() {
  return (
    <div className="header">
      <div className="sort-list">
        <Link href="#">
          <a id="popular-products" className="active">
            Popular products
          </a>
        </Link>
        <Link href="#">
          <a id="low-price" className="">
            Low price
          </a>
        </Link>
        <Link href="#">
          <a id="high-price" className="">
            High price
          </a>
        </Link>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #ffffff;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          margin-bottom: 30px;
        }
        .header .sort-list {
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .header .sort-list a {
          box-sizing: border-box;
          margin-left: 35px;
          padding-top: 18px;
          padding-bottom: 18px;
          text-decoration: none;
          font-weight: bold;
          font-size: 13px;
          text-align: center;
          color: #b3b3b3;
        }
        .header .sort-list a.active {
          color: #1875f0;
          border-bottom: 2px solid #1875f0;
        }
        @media (max-width: 850px) {
          .header {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
