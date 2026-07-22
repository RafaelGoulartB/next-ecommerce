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
          width: 100%;
          margin: 30px 0;
          padding: 52px 24px;
          border: 1px dashed #dce5f2;
          border-radius: 12px;
          background: #ffffff;
          text-align: center;
          font-weight: 500;
          font-size: 22px;
          font-weight: 700;
          color: var(--quantum-text);
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
