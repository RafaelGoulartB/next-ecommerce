import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { VIEWER, MY_CART, MY_WISHLIST } from '../apollo/client/queries';
import {
  MERGE_GUEST_CART,
  MERGE_GUEST_WISHLIST,
} from '../apollo/client/mutations';
import {
  clearGuestCart,
  clearGuestWishlist,
  guestCartProductsVar,
  guestWishlistProductsVar,
} from '../apollo/client/cache';

export default function AuthSessionSync() {
  const client = useApolloClient();
  const { data } = useQuery(VIEWER);
  const [mergeCart] = useMutation(MERGE_GUEST_CART);
  const [mergeWishlist] = useMutation(MERGE_GUEST_WISHLIST);
  const syncedUser = useRef(null);

  useEffect(() => {
    const viewer = data?.viewer;
    if (!viewer) {
      syncedUser.current = null;
      return;
    }
    if (syncedUser.current === viewer.id) return;

    const cartItems = guestCartProductsVar();
    const wishlistItems = guestWishlistProductsVar();
    if (!cartItems.length && !wishlistItems.length) {
      syncedUser.current = viewer.id;
      return;
    }

    let active = true;
    Promise.all([
      cartItems.length
        ? mergeCart({ variables: { items: cartItems.map(({ id, quantity }) => ({ productId: id, quantity })) } })
        : Promise.resolve(),
      wishlistItems.length
        ? mergeWishlist({ variables: { productIds: wishlistItems } })
        : Promise.resolve(),
    ])
      .then(() => {
        if (!active) return;
        clearGuestCart();
        clearGuestWishlist();
        syncedUser.current = viewer.id;
        return client.refetchQueries({ include: [MY_CART, MY_WISHLIST] });
      })
      .catch(() => {
        // Keep guest state if synchronization fails; the next session render retries it.
      });

    return () => {
      active = false;
    };
  }, [client, data?.viewer, mergeCart, mergeWishlist]);

  return null;
}
