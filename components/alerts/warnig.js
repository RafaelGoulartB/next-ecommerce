export default function Warning({ message }) {
  return (
    <>
      <p className="errorMsg">{message}</p>

      <style jsx>{`
        .errorMsg {
          width: 100%;
          text-align: center;
          align-self: center;
          box-sizing: border-box;
          padding: 15px;
          margin-bottom: 20px;

          color: #856404;
          background-color: #fff3cd;
          border: 1px solid transparent;
          border-color: #ffeeba;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
