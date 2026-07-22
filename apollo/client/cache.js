import { InMemoryCache } from '@apollo/client';

const initialGuestCart = [];
const initialGuestWishlist = [];

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
        guestCart: {
          read() {
            const items = guestCartProductsVar();
            return {
              items,
              itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            };
          },
        },
        guestWishlist: {
          read() {
            const products = guestWishlistProductsVar();
            return { products, wishlistCount: products.length };
          },
        },
      },
    },
  },
});

export const isDrawerOpenVar = cache.makeVar(false);
export const sortProductSectionVar = cache.makeVar(['rating', 'DESC']);
export const guestCartProductsVar = cache.makeVar(initialGuestCart);
export const guestWishlistProductsVar = cache.makeVar(initialGuestWishlist);

function writeStorage(key, value) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function hydrateGuestState() {
  if (typeof window === 'undefined') return;
  try {
    const storedCart = JSON.parse(window.localStorage.getItem('quantum-cart') || '[]');
    const storedWishlist = JSON.parse(window.localStorage.getItem('quantum-wishlist') || '[]');
    guestCartProductsVar(
      Array.isArray(storedCart)
        ? storedCart
            .map((item) => ({ id: String(item.id), quantity: Number(item.quantity) }))
            .filter((item) => item.id && Number.isInteger(item.quantity) && item.quantity > 0)
        : []
    );
    guestWishlistProductsVar(
      Array.isArray(storedWishlist) ? storedWishlist.map(String) : []
    );
  } catch (error) {
    guestCartProductsVar([]);
    guestWishlistProductsVar([]);
  }
}

export function setGuestCart(items) {
  const normalized = items
    .map((item) => ({ id: String(item.id), quantity: Number(item.quantity) }))
    .filter((item) => item.id && Number.isInteger(item.quantity) && item.quantity > 0);
  guestCartProductsVar(normalized);
  writeStorage('quantum-cart', normalized);
}

export function toggleGuestCart(id) {
  const productId = String(id);
  const items = guestCartProductsVar();
  const existing = items.find((item) => item.id === productId);
  if (existing) {
    setGuestCart(items.filter((item) => item.id !== productId));
  } else {
    setGuestCart([...items, { id: productId, quantity: 1 }]);
  }
}

export function updateGuestCartItem(id, quantity) {
  const productId = String(id);
  const nextQuantity = Number(quantity);
  setGuestCart(
    guestCartProductsVar().map((item) =>
      item.id === productId ? { ...item, quantity: nextQuantity } : item
    )
  );
}

export function clearGuestCart() {
  guestCartProductsVar([]);
  writeStorage('quantum-cart', []);
}

export function setGuestWishlist(ids) {
  const normalized = [...new Set(ids.map(String))];
  guestWishlistProductsVar(normalized);
  writeStorage('quantum-wishlist', normalized);
}

export function toggleGuestWishlist(id) {
  const productId = String(id);
  const ids = guestWishlistProductsVar();
  setGuestWishlist(
    ids.includes(productId) ? ids.filter((item) => item !== productId) : [...ids, productId]
  );
}

export function clearGuestWishlist() {
  guestWishlistProductsVar([]);
  writeStorage('quantum-wishlist', []);
}

// Backwards-compatible aliases for components that used the original local state helpers.
export const cartProductsVar = guestCartProductsVar;
export const wishlistProductsVar = guestWishlistProductsVar;
