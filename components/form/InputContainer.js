export default function InputContainer({ children }) {
  return (
    <>

      <div className="inputContainer">{children}</div>

      <style jsx>{`
        .inputContainer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
}
