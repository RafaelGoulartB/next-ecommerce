import Link from 'next/link';

export default function FinishOrderCart({ subtotal = '0.00', itemCount = 0 }) {
  return (
    <div className="finishOrder">
      <div className="info">
        <p className="total">Total ({itemCount} items)</p>
        <p className="price">$ {Number(subtotal).toFixed(2)}</p>
      </div>
      <Link href="/checkout"><a>Continue to checkout</a></Link>
      <style jsx>{`
        .finishOrder { display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; width: 280px; padding: 30px; border-radius: 6px; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,.05); }
        .info { display: flex; flex-direction: column; align-items: center; padding-bottom: 20px; }
        .total { margin: 0 0 8px; color: #666; font-size: 14px; font-weight: 500; }
        .price { margin: 0; color: #424b5c; font-size: 22px; font-weight: 900; }
        a { display: flex; align-items: center; justify-content: center; width: 220px; min-height: 44px; border-radius: 6px; background: #1875f0; color: #fff; font-size: 13px; font-weight: 800; text-decoration: none; }
        @media (max-width: 1100px) { .finishOrder { width: 100%; margin-bottom: 30px; } }
      `}</style>
    </div>
  );
}
