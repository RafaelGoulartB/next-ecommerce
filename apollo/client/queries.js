import { gql } from '@apollo/client';

export const GET_DRAWER_STATE = gql`
  query isDrawerOpen {
    isDrawerOpen @client
  }
`;

export const SORT_PRODUCT_SECTION = gql`
  query sortProductSection {
    sortProductSection @client
  }
`;

export const GUEST_CART = gql`
  query guestCart {
    guestCart @client {
      items {
        id
        quantity
      }
      itemCount
    }
  }
`;

export const GUEST_WISHLIST = gql`
  query guestWishlist {
    guestWishlist @client {
      products
      wishlistCount
    }
  }
`;

export const MY_CART = gql`
  query MyCart {
    myCart {
      items {
        productId
        quantity
        unitPrice
        lineTotal
        product {
          id
          name
          description
          img_url
          price
          rating
        }
      }
      itemCount
      subtotal
    }
  }
`;

export const MY_WISHLIST = gql`
  query MyWishlist {
    myWishlist {
      id
      name
      description
      img_url
      price
      rating
    }
  }
`;

export const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      name
      email
      createdAt
    }
  }
`;

export const MY_ORDERS = gql`
  query MyOrders {
    myOrders {
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

export const ORDER_DETAILS = gql`
  query OrderDetails($id: ID!) {
    order(id: $id) {
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

export const PRODUCTS = gql`
  query ProductsQuery($field: String!, $order: String!, $category: String) {
    products(sort: { field: $field, order: $order }, category: $category) {
      id
      name
      description
      img_url
      price
      rating
    }
  }
`;

export const PRODUCTS_BY_IDS = gql`
  query productsByIds($id: [ID]!) {
    productsById(id: $id) {
      id
      name
      description
      img_url
      price
      rating
    }
  }
`;

export const PRODUCTS_BY_IDS_PRICE = gql`
  query productsByIds($id: [ID]!) {
    productsById(id: $id) {
      id
      price
    }
  }
`;

export const PRODUCT_DETAILS = gql`
  query ProductDetails($id: ID!) {
    product(id: $id) {
      id
      name
      description
      img_url
      price
      rating
      categories {
        id
        name
        label
      }
      reviewSummary {
        average
        total
        distribution {
          rating
          count
        }
      }
      reviews {
        id
        product_id
        author_name
        rating
        title
        comment
        verified_purchase
        created_at
      }
      relatedProducts {
        id
        name
        img_url
        price
        rating
      }
    }
  }
`;

export const VIEWER_REVIEW = gql`
  query ViewerReview($productId: ID!) {
    viewerReview(productId: $productId) {
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
