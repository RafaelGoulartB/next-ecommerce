import { wishlistProductsVar, cartProductsVar } from '../apollo/client/cache';

export function toggleWishlist(id) {
  if (wishlistProductsVar().includes(id)) {
    const newWishlist = wishlistProductsVar().filter((item) => item != id);
    wishlistProductsVar(newWishlist);
  } else wishlistProductsVar([...wishlistProductsVar(), id]);
}

export function toggleCart(id) {
  if (cartProductsVar().includes(id)) {
    const newCartList = cartProductsVar().filter((item) => item != id);
    cartProductsVar(newCartList);
  } else cartProductsVar([...cartProductsVar(), id]);
}
