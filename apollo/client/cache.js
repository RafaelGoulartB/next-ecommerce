import { makeVar, InMemoryCache } from '@apollo/client';

export const isDrawerOpen = makeVar(true);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isDrawerOpen: {
          read() {
            return isDrawerOpen();
          }
        }
      }
    }
  }
});
