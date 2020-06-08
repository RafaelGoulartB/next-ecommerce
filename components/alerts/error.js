export default function Alert({ message }) {
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

          color: #a94442;
          background-color: #f2dede;
          border: 1px solid transparent;
          border-color: #ebccd1;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
