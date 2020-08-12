import Link from 'next/link';

export default function EmptySection({ name }) {
  return (
    <>
      {name && (
        <Link href="/">
          <p className="empty-cart">
            You do not have any product in your {name}
          </p>
        </Link>
      )}

      {!name && (
        <Link href="/">
          <p className="empty-cart">This section is empty</p>
        </Link>
      )}

      <style jsx>{`
        .empty-cart {
          box-sizing: border-box;
          margin-top: 80px;
          margin-bottom: 80px;
          text-align: center;
          font-weight: 500;
          font-size: 32px;
          color: #666666;
          text-decoration: none;
          line-height: 42px;
        }
        .empty-cart:hover {
          text-decoration: underline;
        }
        @media (max-width: 1000px) {
          .empty-cart {
            font-size: 28px;
          }
        }
        @media (max-width: 700px) {
          .empty-cart {
            font-size: 25px;
          }
        }
      `}</style>
    </>
  );
}
