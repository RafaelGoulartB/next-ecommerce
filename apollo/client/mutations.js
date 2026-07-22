import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
        createdAt
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
        createdAt
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOutMutation {
    signOut
  }
`;

export const MERGE_GUEST_CART = gql`
  mutation MergeGuestCart($items: [CartItemInput!]!) {
    mergeGuestCart(items: $items) {
      itemCount
      subtotal
    }
  }
`;

export const MERGE_GUEST_WISHLIST = gql`
  mutation MergeGuestWishlist($productIds: [ID!]!) {
    mergeGuestWishlist(productIds: $productIds) {
      id
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int) {
    addToCart(productId: $productId, quantity: $quantity) {
      itemCount
      subtotal
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($productId: ID!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity) {
      itemCount
      subtotal
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      itemCount
      subtotal
    }
  }
`;

export const TOGGLE_WISHLIST = gql`
  mutation ToggleWishlist($productId: ID!) {
    toggleWishlist(productId: $productId) {
      id
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      order_number
      status
      contact_name
      contact_email
      phone
      subtotal
      total
      created_at
      items {
        product_id
        product_name
        unit_price
        quantity
        line_total
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!) {
    updateProfile(name: $name) {
      id
      name
      email
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      product_id
      author_name
      rating
      title
      comment
      verified_purchase
      created_at
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      product_id
      author_name
      rating
      title
      comment
      verified_purchase
      created_at
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
