import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '../components/page-container';
import Link from 'next/link';

import AlertError from '../components/alerts/error';
import Button from '../components/form/button';
import Input from '../components/form/input';
import InputContainer from '../components/form/InputContainer';
import FormContainer from '../components/form/formContainer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (window != 'undefined') {
      const isLogged = localStorage.getItem('auth_token');
      if (isLogged) router.push('/');
      else return;
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    console.log('handle submit');
  }

  return (
    <PageContainer title="Quantum E-commerce - Login">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h3 className="formTitle">login</h3>

          {msgError && <AlertError message={msgError} />}

          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(value) => setEmail(value)}
              value={email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(value) => setPassword(value)}
              value={password}
            />

            <Button type="submit" title="Login" />
          </InputContainer>
        </form>

        <Link href="/signup">
          <a className="switchForm">I do not have a account</a>
        </Link>
      </FormContainer>

      <style jsx>{`
        form {
          width: 100%;
          align-items: center;
        }
        form .formTitle {
          text-align: center;
          font-size: 38px;
          font-weight: 1000;
          letter-spacing: 1.65px;
          color: #b2b2b2;
          text-transform: uppercase;
          margin-bottom: 84px;
        }
        .switchForm {
          color: #b2b2b2;
          margin-top: 12px;
          font-weight: 500;
        }
      `}</style>
    </PageContainer>
  );
}
