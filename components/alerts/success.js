export default function Alert({ message }) {
  return (
    <>
      <p className="successMsg">{message}</p>

      <style jsx>{`
        .successMsg {
          width: 100%;
          text-align: center;
          align-self: center;
          box-sizing: border-box;
          padding: 15px;
          margin-bottom: 20px;

          color: #155724;
          background-color: #d4edda;
          border: 1px solid transparent;
          border-color: #c3e6cb;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
