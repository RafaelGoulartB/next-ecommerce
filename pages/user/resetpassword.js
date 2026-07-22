import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/auth/auth-layout';
import AuthField from '../../components/auth/auth-field';
import AuthSubmit from '../../components/auth/auth-submit';
import useLocale from '../../hooks/use-locale';

export default function ResetPassword() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <AuthLayout title={t('auth.resetTitle')} eyebrow={t('auth.resetNeed')} heading={t('auth.resetTitle')}>
      <p className="intro">{t('auth.resetIntro')}</p>
      <form onSubmit={handleSubmit} noValidate>
        <AuthField
          id="reset-email"
          name="email"
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthSubmit loading={false}>{t('auth.sendReset')}</AuthSubmit>
      </form>
      <p className="switch-copy">
        {t('auth.rememberPassword')} <Link href="/user/login"><a>{t('auth.signIn')}</a></Link>
      </p>
      <p className="switch-copy secondary">
        {t('auth.newToQuantum')} <Link href="/user/signup"><a>{t('auth.createAccount')}</a></Link>
      </p>
      <style jsx>{`
        .intro { margin: -10px 0 26px; color: #8b94a3; font-size: 13px; line-height: 1.6; }
        .switch-copy { margin: 24px 0 0; color: #8b94a3; font-size: 13px; text-align: center; }
        .switch-copy.secondary { margin-top: 10px; }
        .switch-copy a { color: #1875f0; font-weight: 800; text-decoration: none; }
      `}</style>
    </AuthLayout>
  );
}
