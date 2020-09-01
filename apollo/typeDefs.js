import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Int!
  }
  type Product {
    id: ID!
    name: String!
    description: String!
    img_url: String!
    price: String!
    rating: String!
    createdAt: Int
    updatedAt: Int
    user_id: ID!
  }
  type Category {
    id: ID!
    name: String!
    label: String!
    md_icon: String!
    createdAt: Int
  }
  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input ProductInput {
    name: String!
    description: String!
    img_url: String!
    price: String!
    rating: String!
    category_id: Int!
  }
  input UpdateProductInput {
    name: String!
    description: String!
    img_url: String!
    price: String!
    rating: String!
  }
  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }
  type ProductPayload {
    product: Product!
  }
  input Sort {
    field: String!
    order: String! = ASC
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    products(sort: [Sort!], category: String): [Product]!
    product(id: ID!): Product
    categories: [Category]!
  }
  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createProduct(input: ProductInput!): ProductPayload
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, input: UpdateProductInput!): ProductPayload
  }
`;
