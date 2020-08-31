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
      },
    },
  },
});

export const isDrawerOpenVar = cache.makeVar(false);

export const sortProductSectionVar = cache.makeVar(['rating', 'DESC']);
