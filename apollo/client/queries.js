import { gql } from '@apollo/client'

export const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      name
      email
    }
  }
`;

export const PRODUCTS = gql`
  query ProductsQuery {
    products {
      id
      name
      description
      img_url
      price
      rating
    }
  }
`;

export const CATEGORIES = gql`
  query CategoriesQuery {
    categories {
      id
      name
      label
      md_icon
    }
  }
`;
