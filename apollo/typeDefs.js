import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Float!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    img_url: String!
    price: String!
    rating: String!
    createdAt: Float
    updatedAt: Float
    user_id: ID!
    categories: [Category!]!
    reviews: [Review!]!
    reviewSummary: ReviewSummary!
    relatedProducts: [Product!]!
  }

  type Review {
    id: ID!
    product_id: ID!
    author_name: String!
    rating: Int!
    title: String!
    comment: String!
    verified_purchase: Boolean!
    created_at: String!
  }

  type ReviewRatingCount {
    rating: Int!
    count: Int!
  }

  type ReviewSummary {
    average: Float!
    total: Int!
    distribution: [ReviewRatingCount!]!
  }

  type Category {
    id: ID!
    name: String!
    label: String!
    md_icon: String!
    createdAt: Float
  }

  type CartItem {
    productId: ID!
    product: Product!
    quantity: Int!
    unitPrice: String!
    lineTotal: String!
  }

  type Cart {
    items: [CartItem!]!
    itemCount: Int!
    subtotal: String!
  }

  type OrderItem {
    product_id: ID
    product_name: String!
    unit_price: String!
    quantity: Int!
    line_total: String!
  }

  type Order {
    id: ID!
    order_number: String!
    status: String!
    contact_name: String!
    contact_email: String!
    phone: String
    subtotal: String!
    total: String!
    created_at: String!
    items: [OrderItem!]!
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

  input CartItemInput {
    productId: ID!
    quantity: Int!
  }

  input CreateOrderInput {
    contactName: String!
    contactEmail: String!
    phone: String
  }

  input CreateReviewInput {
    productId: ID!
    rating: Int!
    title: String!
    comment: String!
  }

  input UpdateReviewInput {
    rating: Int!
    title: String!
    comment: String!
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
    productsById(id: [ID]): [Product!]
    product(id: ID!): Product
    categories: [Category]!
    myCart: Cart!
    myWishlist: [Product!]!
    myOrders: [Order!]!
    order(id: ID!): Order
    viewerReview(productId: ID!): Review
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    updateProfile(name: String!): User!
    addToCart(productId: ID!, quantity: Int = 1): Cart!
    updateCartItem(productId: ID!, quantity: Int!): Cart!
    removeFromCart(productId: ID!): Cart!
    mergeGuestCart(items: [CartItemInput!]!): Cart!
    clearCart: Boolean!
    toggleWishlist(productId: ID!): [Product!]!
    mergeGuestWishlist(productIds: [ID!]!): [Product!]!
    createOrder(input: CreateOrderInput!): Order!
    createReview(input: CreateReviewInput!): Review!
    updateReview(id: ID!, input: UpdateReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
    createProduct(input: ProductInput!): ProductPayload
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, input: UpdateProductInput!): ProductPayload
  }
`;
