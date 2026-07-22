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

function safeRedirect(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';
}

export default function Login() {
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
      setMsgError('Please fill in your email and password.');
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
    <AuthLayout title="Sign in" eyebrow="Welcome back" heading="Sign in to Quantum">
      <form onSubmit={handleSubmit} noValidate>
        {msgError && <p className="form-error" role="alert">{msgError}</p>}
        <AuthField
          id="login-email"
          name="email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="login-password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <AuthSubmit loading={loading}>Sign in</AuthSubmit>
      </form>
      <p className="switch-copy">
        New to Quantum? <Link href={signUpHref}><a>Create an account</a></Link>
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
