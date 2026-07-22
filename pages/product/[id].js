import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import {
  FaArrowLeft,
  FaCartArrowDown,
  FaCartPlus,
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { PRODUCT_DETAILS, CART, WISHLIST } from '../../apollo/client/queries';
import Page from '../../components/page';
import ErrorAlert from '../../components/alerts/error';
import LoadingPage from '../../components/loading-page';
import ProductItem from '../../components/productItem';
import ProductsGrid from '../../components/productsGrid';
import { toggleCart, toggleWishlist } from '../../utils/toggleProductStates';

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price));
}

function formatReviewDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function ReviewDistribution({ distribution, total }) {
  const counts = distribution || [];
  const maximum = Math.max(...counts.map((item) => item.count), 1);

  return (
    <div className="distribution">
      {[5, 4, 3, 2, 1].map((rating) => {
        const item = counts.find((entry) => entry.rating === rating);
        const count = item?.count || 0;

        return (
          <div className="distribution-row" key={rating}>
            <span className="distribution-label">{rating} stars</span>
            <div className="distribution-bar">
              <span style={{ width: `${(count / maximum) * 100}%` }} />
            </div>
            <span className="distribution-count">{count}</span>
          </div>
        );
      })}
      <p className="distribution-total">Based on {total} reviews</p>
      <style jsx>{`
        .distribution {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 9px;
          width: 100%;
        }
        .distribution-row {
          display: grid;
          grid-template-columns: 62px minmax(120px, 1fr) 28px;
          align-items: center;
          gap: 10px;
          color: #777777;
          font-size: 12px;
        }
        .distribution-label,
        .distribution-count {
          white-space: nowrap;
        }
        .distribution-bar {
          height: 9px;
          overflow: hidden;
          border-radius: 8px;
          background: #e5e5e5;
        }
        .distribution-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #f9ad3d;
          transition: width 0.2s ease;
        }
        .distribution-count {
          text-align: right;
        }
        .distribution-total {
          margin: 4px 0 0;
          color: #999999;
          font-size: 12px;
        }
        @media (max-width: 500px) {
          .distribution-row {
            grid-template-columns: 58px minmax(80px, 1fr) 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [showAllReviews, setShowAllReviews] = useState(false);
  const cart = useQuery(CART);
  const wishlist = useQuery(WISHLIST);
  const { data, loading, error } = useQuery(PRODUCT_DETAILS, {
    variables: { id: typeof id === 'string' ? id : '' },
    skip: !router.isReady || typeof id !== 'string',
  });

  if (!router.isReady || loading) {
    return (
      <Page title="Quantum E-commerce - Product details">
        <LoadingPage />
      </Page>
    );
  }

  if (error || !data?.product) {
    return (
      <Page title="Quantum E-commerce - Product details">
        <ErrorAlert message="This product is not found!" />
      </Page>
    );
  }

  const product = data.product;
  const categories = product.categories || [];
  const reviews = product.reviews || [];
  const summary = product.reviewSummary || {
    average: Number(product.rating),
    total: reviews.length,
    distribution: [],
  };
  const cartProducts = cart.data?.cart?.products || [];
  const wishlistProducts = wishlist.data?.wishlist?.products || [];
  const isInCart = cartProducts.includes(product.id);
  const isInWishlist = wishlistProducts.includes(product.id);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 5);
  const category = categories[0];

  return (
    <Page
      title={`${product.name} - Quantum E-commerce`}
      description={product.description}
    >
      <div className="product-details-page">
        <Link href={category ? `/category/${category.name}` : '/'}>
          <a className="back-link">
            <FaArrowLeft size={13} /> Back to products
          </a>
        </Link>

        <article className="product-hero">
          <div className="product-media">
            <img
              src={product.img_url}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = '/products/81hCytKTUTL.jpg';
              }}
            />
          </div>

          <div className="product-information">
            <div className="category-list">
              {categories.map((item) => (
                <Link href={`/category/${item.name}`} key={item.id}>
                  <a className="category-chip">{item.label}</a>
                </Link>
              ))}
            </div>

            <h1>{product.name}</h1>

            <div className="rating-summary">
              <StarRatings
                rating={Number(summary.average)}
                starRatedColor="#F9AD3D"
                numberOfStars={5}
                name="product-rating"
                starDimension="22px"
                starSpacing="1px"
              />
              <span>
                {Number(summary.average).toFixed(1)} ({summary.total} reviews)
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="purchase-panel">
              <p className="price">{formatPrice(product.price)}</p>
              <div className="purchase-actions">
                <button
                  className="cart-button"
                  onClick={() => toggleCart(product.id)}
                >
                  {isInCart ? <FaCartArrowDown /> : <FaCartPlus />}
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </button>
                <button
                  className="wishlist-button"
                  aria-label={
                    isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                  onClick={() => toggleWishlist(product.id)}
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        </article>

        <section className="reviews-section">
          <div className="section-heading">
            <p className="eyebrow">Customer feedback</p>
            <h2>Reviews</h2>
          </div>

          <div className="reviews-summary">
            <div className="average-rating">
              <strong>{Number(summary.average).toFixed(1)}</strong>
              <StarRatings
                rating={Number(summary.average)}
                starRatedColor="#F9AD3D"
                numberOfStars={5}
                name="review-summary-rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <span>{summary.total} reviews</span>
            </div>
            <ReviewDistribution
              distribution={summary.distribution}
              total={summary.total}
            />
          </div>

          <div className="review-list">
            {visibleReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-header">
                  <div>
                    <strong>{review.author_name}</strong>
                    <span className="review-date">
                      {formatReviewDate(review.created_at)}
                    </span>
                  </div>
                  {review.verified_purchase && (
                    <span className="verified-review">
                      <FaCheckCircle size={13} /> Verified purchase
                    </span>
                  )}
                </div>
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#F9AD3D"
                  numberOfStars={5}
                  name={`review-${review.id}`}
                  starDimension="16px"
                  starSpacing="1px"
                />
                <h3>{review.title}</h3>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>

          {reviews.length > 5 && (
            <button
              className="show-reviews-button"
              onClick={() => setShowAllReviews((visible) => !visible)}
            >
              {showAllReviews ? 'Show fewer reviews' : 'Show all reviews'}
            </button>
          )}
        </section>

        {!!product.relatedProducts?.length && (
          <section className="related-section">
            <div className="section-heading">
              <p className="eyebrow">You may also like</p>
              <h2>Related products</h2>
            </div>
            <ProductsGrid>
              {product.relatedProducts.map((relatedProduct) => (
                <ProductItem
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  rating={relatedProduct.rating}
                  img_url={relatedProduct.img_url}
                  price={relatedProduct.price}
                />
              ))}
            </ProductsGrid>
          </section>
        )}
      </div>

      <style jsx>{`
        .product-details-page {
          width: 100%;
          max-width: 1200px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          color: #1875f0;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }
        .product-hero,
        .reviews-section,
        .related-section {
          box-sizing: border-box;
          width: 100%;
          padding: 32px;
          margin-bottom: 30px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .product-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: center;
        }
        .product-media {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 360px;
          padding: 24px;
          background: #fafafa;
          border-radius: 8px;
        }
        .product-media img {
          width: 100%;
          max-width: 480px;
          height: 360px;
          object-fit: contain;
        }
        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .category-chip {
          padding: 6px 10px;
          border-radius: 20px;
          background: #edf4ff;
          color: #1875f0;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .product-information h1 {
          margin: 0 0 18px;
          color: #444444;
          font-size: 32px;
          line-height: 1.2;
        }
        .rating-summary,
        .average-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .rating-summary span,
        .average-rating span {
          color: #777777;
          font-size: 14px;
        }
        .product-description {
          margin: 24px 0;
          color: #666666;
          font-size: 16px;
          line-height: 1.7;
        }
        .purchase-panel {
          padding-top: 24px;
          border-top: 1px solid #eeeeee;
        }
        .price {
          margin: 0 0 18px;
          color: #333333;
          font-size: 32px;
          font-weight: 900;
        }
        .purchase-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cart-button,
        .wishlist-button,
        .show-reviews-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 44px;
          border: 0;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 700;
        }
        .cart-button {
          padding: 0 20px;
          background: #1875f0;
          color: #ffffff;
        }
        .wishlist-button {
          width: 44px;
          background: #f1f1f1;
          color: #1875f0;
          font-size: 18px;
        }
        .section-heading {
          margin-bottom: 24px;
        }
        .section-heading h2 {
          margin: 4px 0 0;
          color: #444444;
          font-size: 28px;
        }
        .eyebrow {
          margin: 0;
          color: #1875f0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .reviews-summary {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px;
          padding: 24px;
          margin-bottom: 24px;
          border-radius: 8px;
          background: #fafafa;
        }
        .average-rating {
          align-content: center;
          flex-direction: column;
          justify-content: center;
        }
        .average-rating strong {
          color: #333333;
          font-size: 48px;
          line-height: 1;
        }
        .review-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .review-card {
          padding: 20px;
          border: 1px solid #eeeeee;
          border-radius: 8px;
        }
        .review-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .review-header strong {
          display: block;
          color: #444444;
          font-size: 14px;
        }
        .review-date {
          display: block;
          margin-top: 4px;
          color: #999999;
          font-size: 12px;
        }
        .verified-review {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #25965a;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }
        .review-card h3 {
          margin: 12px 0 6px;
          color: #444444;
          font-size: 15px;
        }
        .review-card p {
          margin: 0;
          color: #777777;
          font-size: 14px;
          line-height: 1.6;
        }
        .show-reviews-button {
          padding: 0 18px;
          margin-top: 22px;
          border: 1px solid #1875f0;
          background: #ffffff;
          color: #1875f0;
        }
        @media (max-width: 800px) {
          .product-details-page {
            width: 80vw;
          }
          .product-hero {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .reviews-summary,
          .review-list {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 500px) {
          .product-details-page {
            width: 90vw;
          }
          .product-hero,
          .reviews-section,
          .related-section {
            padding: 20px;
          }
          .product-media {
            min-height: 240px;
          }
          .product-media img {
            height: 240px;
          }
          .product-information h1 {
            font-size: 25px;
          }
          .price {
            font-size: 27px;
          }
          .cart-button {
            flex: 1;
            padding: 0 12px;
          }
          .reviews-summary {
            padding: 18px;
          }
        }
      `}</style>
    </Page>
  );
}
