import Link from 'next/link';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import useShoppingState from '../hooks/use-shopping-state';

export default function ProductSection({ id, name, rating, img_url, price }) {
  const {
    cartItems,
    wishlistIds,
    toggleCartItem,
    toggleWishlistItem,
  } = useShoppingState();
  const cartProduct = cartItems.find((item) => String(item.productId) === String(id));
  const isInCart = Boolean(cartProduct);
  const isInWishlist = wishlistIds.includes(String(id));

  return (
    <article>
      <div className="top-buttons">
        <button
          className="add-wishlist"
          onClick={() => toggleWishlistItem(id)}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist && (
            <FaHeart size={18} color="#71869a" />
          )}
          {!isInWishlist && (
            <FaRegHeart size={18} color="#71869a" />
          )}
        </button>
      </div>

      <div className="product-img-box">
        <Link href={`/product/${id}`}>
            <img className="product-img" src={img_url} alt={name} />
        </Link>
      </div>

      <Link href={`/product/${id}`}>
        <a className="product-name">{name}</a>
      </Link>

      <div className="rating">
        <StarRatings
          rating={parseFloat(rating)}
          starRatedColor="#F9AD3D"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
      </div>

      <div className="price">
        <p className="price-value">${price}</p>
        <button
          className="add-cart"
          onClick={() => toggleCartItem(id)}
          aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
        >
          {isInCart && (
            <FaCartArrowDown size={17} color="#71869a" />
          )}
          {!isInCart && (
            <FaCartPlus size={17} color="#71869a" />
          )}
        </button>
      </div>

      <style jsx>{`
        article {
          display: flex;
          align-items: center;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          padding: 18px;
          background: var(--quantum-surface);
          border: 1px solid #edf0f5;
          box-shadow: 0 10px 24px rgba(34, 55, 89, .06);
          border-radius: 12px;
          transition: transform .2s, box-shadow .2s;
        }
        article:hover { transform: translateY(-3px); box-shadow: 0 16px 30px rgba(34, 55, 89, .1); }
        .top-buttons {
          margin-bottom: 14px;
          align-self: flex-end;
        }
        .top-buttons .add-wishlist {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: #f4f7fb;
          cursor: pointer;
        }
        .top-buttons .add-wishlist:focus {
          outline: none;
        }
        .product-img-box {
          width: 100%;
          margin-bottom: 18px;
          padding: 14px;
          border-radius: 9px;
          background: #fafbfe;
        }
        .product-img {
          width: 100%;
          height: 170px;
          object-fit: contain;
        }
        .product-name {
          width: 80%;
          line-height: 20px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          color: var(--quantum-ink);
          margin-bottom: 18px;
        }
        .product-name:hover {
          text-decoration: underline;
          font-weight: 600;
        }
        .rating {
          margin-bottom: 18px;
        }
        .price {
          display: flex;
          align-items: center;
          font-weight: 900;
          font-size: 16px;
          color: var(--quantum-text);
        }
        .price .add-cart {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          margin-left: 8px;
          border: 0;
          border-radius: 50%;
          background: #f0f4f8;
          cursor: pointer;
        }
        .price .add-cart:focus {
          outline: none;
        }
      `}</style>
    </article>
  );
}
