import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { SIGN_UP } from '../../apollo/client/mutations';
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

export default function SignUp() {
  const { t } = useLocale();
  const router = useRouter();
  const client = useApolloClient();
  const [signUp, { loading }] = useMutation(SIGN_UP);
  const { data: viewerData, loading: viewerLoading } = useQuery(VIEWER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    if (!viewerLoading && viewerData?.viewer) {
      router.replace(safeRedirect(router.query.redirect));
    }
  }, [router, viewerData, viewerLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMsgError('');
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setMsgError(t('auth.completeFields'));
      return;
    }
    if (password.length < 6) {
      setMsgError(t('auth.passwordLength'));
      return;
    }
    if (password !== confirmPassword) {
      setMsgError(t('auth.passwordsMismatch'));
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      await signUp({
        variables: { name: name.trim(), email: email.trim().toLowerCase(), password },
      });
      await client.resetStore();
      await router.replace(safeRedirect(router.query.redirect));
    } catch (error) {
      setMsgError(getErrorMessage(error));
    }
  }

  const loginHref = router.query.redirect
    ? { pathname: '/user/login', query: { redirect: router.query.redirect } }
    : '/user/login';

  return (
    <AuthLayout title={t('auth.createAccount')} eyebrow={t('auth.joinExperience')} heading={t('auth.createYourAccount')}>
      <form onSubmit={handleSubmit} noValidate>
        {msgError && <p className="form-error" role="alert">{msgError}</p>}
        <AuthField
          id="signup-name"
          name="name"
          label={t('auth.fullName')}
          value={name}
          onChange={setName}
          placeholder="Alex Morgan"
          autoComplete="name"
        />
        <AuthField
          id="signup-email"
          name="email"
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="signup-password"
          name="password"
          label={t('auth.password')}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={t('auth.passwordMin')}
          autoComplete="new-password"
        />
        <AuthField
          id="signup-confirm-password"
          name="confirm_password"
          label={t('auth.confirmPassword')}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder={t('auth.repeatPassword')}
          autoComplete="new-password"
        />
        <AuthSubmit loading={loading}>{t('auth.createAccount')}</AuthSubmit>
      </form>
      <p className="switch-copy">
        {t('auth.alreadyAccount')} <Link href={loginHref}><a>{t('auth.signIn')}</a></Link>
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
