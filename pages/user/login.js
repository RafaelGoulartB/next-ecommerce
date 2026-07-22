import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../../apollo/client/mutations';
import { VIEWER } from '../../apollo/client/queries';
import { getErrorMessage } from '../../lib/form';
import AuthLayout from '../../components/auth/auth-layout';
import AuthField from '../../components/auth/auth-field';
import AuthSubmit from '../../components/auth/auth-submit';
import useLocale from '../../hooks/use-locale';

function safeRedirect(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';
}

export default function Login() {
  const { t } = useLocale();
  const router = useRouter();
  const client = useApolloClient();
  const [signIn, { loading }] = useMutation(SIGN_IN);
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    if (!viewerLoading && viewerData?.viewer) {
      router.replace(safeRedirect(router.query.redirect));
    }
  }, [router, viewerData, viewerLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMsgError('');
    if (!email.trim() || !password) {
      setMsgError(t('auth.fillCredentials'));
      return;
    }

    try {
      await signIn({ variables: { email: email.trim().toLowerCase(), password } });
      await client.resetStore();
      await router.replace(safeRedirect(router.query.redirect));
    } catch (error) {
      setMsgError(getErrorMessage(error));
    }
  }

  const signUpHref = router.query.redirect
    ? { pathname: '/user/signup', query: { redirect: router.query.redirect } }
    : '/user/signup';

  return (
    <AuthLayout title={t('auth.signIn')} eyebrow={t('auth.welcomeBack')} heading={t('auth.signInToQuantum')}>
      <form onSubmit={handleSubmit} noValidate>
        {msgError && <p className="form-error" role="alert">{msgError}</p>}
        <AuthField
          id="login-email"
          name="email"
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="login-password"
          name="password"
          label={t('auth.password')}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete="current-password"
        />
        <AuthSubmit loading={loading}>{t('auth.signIn')}</AuthSubmit>
      </form>
      <p className="switch-copy">
        {t('auth.newToQuantum')} <Link href={signUpHref}><a>{t('auth.createAccount')}</a></Link>
      </p>
      <style jsx>{`
        .form-error {
          margin: 0 0 18px;
          padding: 12px 14px;
          border: 1px solid #f1c5c5;
          border-radius: 9px;
          background: #fff4f4;
          color: #a33e3e;
          font-size: 13px;
          line-height: 1.45;
        }
        .switch-copy { margin: 24px 0 0; color: #8b94a3; font-size: 13px; text-align: center; }
        .switch-copy a { color: #1875f0; font-weight: 800; text-decoration: none; }
      `}</style>
    </AuthLayout>
  );
}
