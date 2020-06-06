import { useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '../components/page-container';
import Link from 'next/link';
import api from '../services/api';
import styles from './Auth-form.module.css';

import Button from '../components/form/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('user/login', data);
      if(response.data.error) {
        setMsgError(response.data.error)
        return;
      }

      localStorage.setItem('user', response.data.user);
      localStorage.setItem('auth_token', response.data.token);
      router.push('/')
    } catch {
      setMsgError('Network error, please try again later.')
      return;
    }
  }

  return (
    <PageContainer title="Quantum E-commerce - Login">
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>quantum ecommerce</h1>
        <form onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>login</h3>
          {msgError && (
            <p className={styles.errorMsg}>{msgError}</p>
          )}
          <div className={styles.inputs}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <Button type="submit" title="Login"/>

          <Link href="/signup">
            <a className={styles.switchForm}>I do not have a account</a>
          </Link>
        </form>
      </div>
    </PageContainer>
  );
}
