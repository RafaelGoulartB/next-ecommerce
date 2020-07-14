import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageContainer from '../../components/page-container';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { getErrorMessage } from '../../lib/form';

import AlertError from '../../components/alerts/error';
import Button from '../../components/form/button';
import Input from '../../components/form/input';
import InputContainer from '../../components/form/InputContainer';
import FormContainer from '../../components/form/formContainer';

const SignUpMutation = gql`
  mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      user {
        id
        name
        email
      }
    }
  }
`;

export default function SignUp() {
  const [signUp] = useMutation(SignUpMutation);
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [msgError, setMsgError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (password != confirm_password) {
      setMsgError('The passwords do not match');
      setPassword('');
      setConfirm_password('');
      return;
    }

    try {
      const result = await signUp({
        variables: {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        },
      });

      router.push('/user/login');
    } catch (error) {
      setMsgError(getErrorMessage(error));
    }
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

        <Link href="/user/login">
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
