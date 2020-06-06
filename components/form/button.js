export default function Button({ type, title }) {
  return (
    <>
      <button type={type}>{title}</button>

      <style jsx>{`
        button {
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
          .loginContainer form button {
            align-self: center;
            width: 80%;
          }
        }
        @media (max-width: 800px) {
          .loginContainer form button {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
}
