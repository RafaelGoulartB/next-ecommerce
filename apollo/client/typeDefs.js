import { gql } from '@apollo/client'

export const typeDefs = gql`
  extend type Query {
    isDrawerOpen: Boolean!
  }
  extend type Mutation {
    toggleDrawer(id: ID!): [Launch]
  }
`;
