import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isDrawerOpen: {
          read() {
            return isDrawerOpenVar();
          },
        },
        sortProductSection: {
          read() {
            return sortProductSectionVar();
          },
        },
        cart: {
          read() {
            return {
              products: cartProductsVar(),
              cartCount: cartProductsVar().length,
            };
          },
        },
        wishlist: {
          read() {
            return {
              products: wishlistProductsVar(),
              wishlistCount: wishlistProductsVar().length,
            };
          },
        },
      },
    },
  },
});

export const isDrawerOpenVar = cache.makeVar(false);

export const sortProductSectionVar = cache.makeVar(['rating', 'DESC']);

export const cartProductsVar = cache.makeVar([]);

export const wishlistProductsVar = cache.makeVar([]);
