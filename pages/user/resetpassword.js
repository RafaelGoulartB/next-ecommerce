import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/auth/auth-layout';
import AuthField from '../../components/auth/auth-field';
import AuthSubmit from '../../components/auth/auth-submit';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <AuthLayout title="Reset password" eyebrow="Need a hand?" heading="Reset your password">
      <p className="intro">Enter the email connected to your account and we’ll help you get back in.</p>
      <form onSubmit={handleSubmit} noValidate>
        <AuthField
          id="reset-email"
          name="email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthSubmit loading={false}>Send reset link</AuthSubmit>
      </form>
      <p className="switch-copy">
        Remember your password? <Link href="/user/login"><a>Sign in</a></Link>
      </p>
      <p className="switch-copy secondary">
        New to Quantum? <Link href="/user/signup"><a>Create an account</a></Link>
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
