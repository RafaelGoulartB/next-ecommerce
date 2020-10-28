import { useQuery } from '@apollo/client';
import Link from 'next/link';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { toggleCart, toggleWishlist } from '../utils/toggleProductStates';
import { CART, WISHLIST } from '../apollo/client/queries';

export default function ProductSection({ id, name, rating, img_url, price }) {
  const cart = useQuery(CART);
  const wishlist = useQuery(WISHLIST);

  return (
    <article>
      <div className="top-buttons">
        <button className="add-wishlist" onClick={() => toggleWishlist(id)}>
          {wishlist.data.wishlist.products.includes(id) && (
            <FaHeart size={20} color="#D8D8D8" />
          )}
          {!wishlist.data.wishlist.products.includes(id) && (
            <FaRegHeart size={20} color="#D8D8D8" />
          )}
        </button>
      </div>

      <div className="product-img">
        <Link href={`/product/${id}`}>
          <Image src={img_url} width="225" height="160" />
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
        <button className="add-cart" onClick={() => toggleCart(id)}>
          {cart.data.cart.products.includes(id) && (
            <FaCartArrowDown size={18} color="#D8D8D8" />
          )}
          {!cart.data.cart.products.includes(id) && (
            <FaCartPlus size={18} color="#D8D8D8" />
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
          padding: 24px;
          background: white;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
        }
        .top-buttons {
          margin-bottom: 24px;
          align-self: flex-end;
        }
        .top-buttons .add-wishlist {
          background: none;
          border: none;
        }
        .top-buttons .add-wishlist:focus {
          outline: none;
        }
        .product-img {
          margin-bottom: 28px;
        }
        .product-name {
          width: 80%;
          line-height: 20px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          color: #666666;
          margin-bottom: 18px;
        }
        .product-name:hover {
          text-decoration: underline;
          font-weight: 600;
        }
        .rating {
          margin-bottom: 24px;
        }
        .price {
          display: flex;
          align-items: center;
          font-weight: 900;
          font-size: 16px;
          color: #666666;
        }
        .price .add-cart {
          background: none;
          border: none;
          margin-left: 5px;
        }
        .price .add-cart:focus {
          outline: none;
        }
      `}</style>
    </article>
  );
}
