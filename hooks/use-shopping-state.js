import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_WISHLIST,
  UPDATE_CART_ITEM,
} from '../apollo/client/mutations';
import {
  GUEST_CART,
  GUEST_WISHLIST,
  MY_CART,
  MY_WISHLIST,
  VIEWER,
} from '../apollo/client/queries';
import {
  toggleGuestCart,
  toggleGuestWishlist,
  updateGuestCartItem,
} from '../apollo/client/cache';

export default function useShoppingState() {
  const { data: viewerData } = useQuery(VIEWER);
  const viewer = viewerData?.viewer;
  const { data: guestCartData } = useQuery(GUEST_CART);
  const { data: guestWishlistData } = useQuery(GUEST_WISHLIST);
  const { data: myCartData } = useQuery(MY_CART, { skip: !viewer });
  const { data: myWishlistData } = useQuery(MY_WISHLIST, { skip: !viewer });
  const [addToCart] = useMutation(ADD_TO_CART, { refetchQueries: [MY_CART] });
  const [updateCartItem] = useMutation(UPDATE_CART_ITEM, { refetchQueries: [MY_CART] });
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, { refetchQueries: [MY_CART] });
  const [toggleWishlist] = useMutation(TOGGLE_WISHLIST, { refetchQueries: [MY_WISHLIST] });

  const cartItems = viewer
    ? myCartData?.myCart?.items || []
    : (guestCartData?.guestCart?.items || []).map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
  const wishlistIds = viewer
    ? (myWishlistData?.myWishlist || []).map((product) => String(product.id))
    : (guestWishlistData?.guestWishlist?.products || []).map(String);

  async function toggleCartItem(productId) {
    const id = String(productId);
    const existing = cartItems.find((item) => String(item.productId) === id);
    if (!viewer) {
      toggleGuestCart(id);
      return;
    }
    if (existing) {
      await removeFromCart({ variables: { productId: id } });
    } else {
      await addToCart({ variables: { productId: id, quantity: 1 } });
    }
  }

  async function setCartQuantity(productId, quantity) {
    const id = String(productId);
    if (!viewer) {
      updateGuestCartItem(id, quantity);
      return;
    }
    await updateCartItem({ variables: { productId: id, quantity } });
  }

  async function removeCartProduct(productId) {
    const id = String(productId);
    if (!viewer) {
      updateGuestCartItem(id, 0);
      return;
    }
    await removeFromCart({ variables: { productId: id } });
  }

  async function toggleWishlistItem(productId) {
    const id = String(productId);
    if (!viewer) {
      toggleGuestWishlist(id);
      return;
    }
    await toggleWishlist({ variables: { productId: id } });
  }

  return {
    viewer,
    isAuthenticated: Boolean(viewer),
    cartItems,
    wishlistIds,
    toggleCartItem,
    setCartQuantity,
    removeCartProduct,
    toggleWishlistItem,
  };
}
