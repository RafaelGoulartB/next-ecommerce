import { ApolloServer, gql } from 'apollo-server-micro';

export default gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;
