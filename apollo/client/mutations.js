import { gql } from '@apollo/client';

export const SIGN_IN = gql`
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

export const SIGN_UP = gql`
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
