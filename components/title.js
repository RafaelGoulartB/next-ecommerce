export default function Profile({ title }) {
  return (
    <>
      <h2>{title}</h2>
      <style jsx>{`
        h2 {
          font-weight: 900;
          font-size: 48px;
          letter-spacing: 1.65px;
          color: #4d4d4d;
          margin-top: 15px;
          margin-bottom: 30px;
          align-self: flex-start;
        }
      `}</style>
    </>
  );
}
