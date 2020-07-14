import { useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '../../components/page-container';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { getErrorMessage } from '../../lib/form';

import AlertError from '../../components/alerts/error';
import Button from '../../components/form/button';
import Input from '../../components/form/input';
import InputContainer from '../../components/form/InputContainer';
import FormContainer from '../../components/form/formContainer';

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
    }
  }
`;

export default function Login() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: email.trim(),
          password: password.trim(),
        },
      });
      if (data.signIn.user) {
        await router.push('/');
      }
    } catch (error) {
      setMsgError(getErrorMessage(error));
    }
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

        <Link href="/user/signup">
          <a className="switchForm">I do not have a account</a>
        </Link>
        <Link href="/user/resetpassword">
          <a className="switchForm">I forgot my password</a>
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
