export default function ToggleDrawerButton({ openDrawer }) {
  return (
    <button onClick={openDrawer}>
      <div className="button-line" />
      <div className="button-line" />
      <div className="button-line" />

      <style jsx>{`
        button {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 20px;
          width: 26px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          box-sizing: border-box;
          margin-right: 28px;
        }
        button:focus {
          outline: none;
        }
        button .button-line {
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: #4d4d4d;
        }
      `}</style>
    </button>
  );
}
