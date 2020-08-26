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
      },
    },
  },
});

export const isDrawerOpenVar = cache.makeVar(false);
