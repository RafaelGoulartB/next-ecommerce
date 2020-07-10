import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageContainer from '../components/page-container';

import AlertError from '../components/alerts/error';
import Button from '../components/form/button';
import Input from '../components/form/input';
import InputContainer from '../components/form/InputContainer';
import FormContainer from '../components/form/formContainer';

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    if (window != 'undefined') {
      const isLogged = localStorage.getItem('auth_token');
      if (isLogged) router.push('/');
      else return;
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (password != confirm_password) {
      setMsgError('The passwords do not match');
      setPassword('');
      setConfirm_password('');
      return;
    }

    console.log('handle submit');
  }

  return (
    <PageContainer title="Quantum E-commerce - Sign Up">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h3 className="formTitle">sign up</h3>

          {msgError && <AlertError message={msgError} />}
          <InputContainer>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(value) => setName(value)}
              value={name}
            />
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
            <Input
              type="password"
              name="confirm_password"
              placeholder="Repeat Password"
              onChange={(value) => setConfirm_password(value)}
              value={confirm_password}
            />

            <Button type="submit" title="Sign Up" />
          </InputContainer>
        </form>

        <Link href="/login">
          <a className="switchForm">I already have a account</a>
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
