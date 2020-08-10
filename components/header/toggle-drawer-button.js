export default function ToggleDrawerButton() {
  return (
    <button>
      <div className="button-line" />
      <div className="button-line" />
      <div className="button-line" />

      <style jsx>{`
        button {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 22px;
          width: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          box-sizing: border-box;
          margin-right: 18px;
        }
        button .button-line {
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: #4d4d4d;
        }
      `}</style>
    </button>
  );
}
