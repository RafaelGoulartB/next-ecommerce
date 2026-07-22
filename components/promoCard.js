import useLocale from '../hooks/use-locale';

export default function PromoCard() {
  const { t } = useLocale();
  return (
    <div className="promo-card">
      <p className="title">{t('promo.title')}</p>
      <p className="description">{t('promo.description')}</p>

      <style jsx>{`
        .promo-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #ffffff, #f1f6fd);
          border-radius: 12px;
          height: 300px;
          width: 250px;
          max-width: 250px;
          padding: 26px;
          border: 1px solid #e5edf7;
          box-shadow: 0 10px 24px rgba(34, 55, 89, .06);
          position: relative;
          overflow: hidden;
        }
        .promo-card:after { content: ''; position: absolute; width: 170px; height: 170px; right: -85px; top: -55px; border: 1px solid rgba(24,117,240,.12); border-radius: 50%; }
        .promo-card .title {
          font-weight: 500;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
          color: #252b3a;
          font-weight: 800;
        }
        .promo-card .description {
          font-weight: 500;
          font-size: 14px;
          line-height: 30px;
          color: #7d8799;
        }
        @media (max-width: 1000px) {
          .promo-card {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
