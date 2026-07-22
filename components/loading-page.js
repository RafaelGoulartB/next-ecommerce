import Loader from 'react-loader-spinner';
import useLocale from '../hooks/use-locale';

export default function LoadingPage() {
  const { t } = useLocale();
  return (
    <div className="spinner" role="status" aria-label={t('common.loading')}>
      <Loader
        type="Oval"
        color="#71869a"
        height={60}
        width={60}
      />
      <style jsx>{`
          .spinner {
            display: flex;
                align-items: center;
                justify-content: center;
                min-height: 180px;
                margin-top: 1em;
          }
        `}</style>
    </div>
  )
}
