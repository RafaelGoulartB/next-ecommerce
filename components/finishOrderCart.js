export default function FinishOrderCart() {
  return (
    <div className="finishOrder">
      <div className="info">
        <p className="total">Total(1 Item):</p>
        <p className="price">$356.15</p>
      </div>
      <button>Finish Order</button>
      <style jsx>{`
        .finishOrder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffff;
          border-radius: 6px;
          width: 260px;
          max-width: 255px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .finishOrder .info {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 30px;
        }
        .finishOrder .info p.total {
          font-weight: 500;
          font-size: 20px;
          color: #666666;
          padding-right: 8px;
        }
        .finishOrder .info p.price {
          font-weight: 900;
          font-size: 22px;
          color: #666666;
        }
        .finishOrder button {
          width: 220px;
          color: #fff;
          background: #808080;
          border-radius: 6px;
          border: none;
          padding-bottom: 16px;
          padding-top: 16px;
          font-weight: bold;
          font-size: 15px;
          transition: 0.7s;
        }
        .finishOrder button:focus {
          outline: none;
          opacity: 0.5;
        }
        @media (max-width: 1100px) {
          .finishOrder {
            flex-grow: 1;
            width: 100%;
            margin-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
}
