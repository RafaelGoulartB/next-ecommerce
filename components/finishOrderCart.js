import Link from 'next/link';
import useCurrency from '../hooks/use-currency';
import useLocale from '../hooks/use-locale';

export default function FinishOrderCart({ subtotal = '0.00', itemCount = 0 }) {
  const { formatPrice } = useCurrency();
  const { t } = useLocale();

  return (
    <div className="finishOrder">
      <div className="info">
        <p className="total">{t('common.total')} ({itemCount} {t(itemCount === 1 ? 'common.item' : 'common.items')})</p>
        <p className="price">{formatPrice(subtotal)}</p>
      </div>
      <Link href="/checkout"><a>{t('cart.checkout')}</a></Link>
      <style jsx>{`
        .finishOrder { display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; width: 280px; padding: 30px; border: 1px solid #edf0f5; border-radius: 12px; background: #fff; box-shadow: 0 10px 24px rgba(34,55,89,.06); }
        .info { display: flex; flex-direction: column; align-items: center; padding-bottom: 20px; }
        .total { margin: 0 0 8px; color: #666; font-size: 14px; font-weight: 500; }
        .price { margin: 0; color: #424b5c; font-size: 22px; font-weight: 900; }
        a { display: flex; align-items: center; justify-content: center; width: 220px; min-height: 46px; border-radius: 9px; background: var(--quantum-blue); color: #fff; font-size: 13px; font-weight: 800; text-decoration: none; }
        @media (max-width: 1100px) { .finishOrder { width: 100%; margin-bottom: 30px; } }
      `}</style>
    </div>
  );
}
