export default function Button({ type, title }) {
  return (
    <>
      <button type={type}>{title}</button>

      <style jsx>{`
        button {
          width: 100%;
          margin-top: 32px;
          background-color: #1875f0;
          color: #ffffff;
          border: none;
          width: 50%;
          font-size: 18px;
          border-radius: 6px;
          padding-bottom: 1em;
          padding-top: 1em;
          align-self: center;
        }
        @media (max-width: 1000px) {
          button {
            width: 70vw;
          }
        }
        @media (max-width: 800px) {
          button {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
}
