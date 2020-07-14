import { useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '../../components/page-container';
import Link from 'next/link';
import { getErrorMessage } from '../../lib/form';

import AlertError from '../../components/alerts/error';
import Button from '../../components/form/button';
import Input from '../../components/form/input';
import InputContainer from '../../components/form/InputContainer';
import FormContainer from '../../components/form/formContainer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [msgError, setMsgError] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PageContainer title="Quantum E-commerce - Reset Password">
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <h3 className="formTitle">Reset Password</h3>

          {msgError && <AlertError message={msgError} />}

          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(value) => setEmail(value)}
              value={email}
            />

            <Button type="submit" title="Send Email" />
          </InputContainer>
        </form>

        <Link href="/user/signup">
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
