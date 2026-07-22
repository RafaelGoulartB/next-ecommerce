import useLocale from '../hooks/use-locale';

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="language-selector">
      <span className="sr-only">{t('common.language')}</span>
      <select
        aria-label={t('common.language')}
        value={locale}
        onChange={(event) => setLocale(event.target.value)}
      >
        <option value="en">{t('common.english')}</option>
        <option value="es">{t('common.spanish')}</option>
      </select>
      <style jsx>{`
        .language-selector { display: inline-flex; align-items: center; }
        select {
          padding: 0 17px 0 0;
          border: 0;
          background: transparent;
          color: var(--quantum-muted);
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 500;
        }
        select:focus {
          outline: 2px solid rgba(96, 123, 150, .35);
          outline-offset: 3px;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </label>
  );
}
