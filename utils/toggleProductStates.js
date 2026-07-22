import {
  toggleGuestCart,
  toggleGuestWishlist,
} from '../apollo/client/cache';

export function toggleCart(id) {
  toggleGuestCart(id);
}

export function toggleWishlist(id) {
  toggleGuestWishlist(id);
}
