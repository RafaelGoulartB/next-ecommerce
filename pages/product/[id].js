import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import {
  FaArrowLeft,
  FaCartArrowDown,
  FaCartPlus,
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { PRODUCT_DETAILS, VIEWER_REVIEW } from '../../apollo/client/queries';
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from '../../apollo/client/mutations';
import Page from '../../components/page';
import ErrorAlert from '../../components/alerts/error';
import LoadingPage from '../../components/loading-page';
import ProductItem from '../../components/productItem';
import ProductsGrid from '../../components/productsGrid';
import useShoppingState from '../../hooks/use-shopping-state';
import useCurrency from '../../hooks/use-currency';
import useLocale from '../../hooks/use-locale';

function formatReviewDate(date, localeCode) {
  return new Intl.DateTimeFormat(localeCode, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function ReviewDistribution({ distribution, total }) {
  const { t } = useLocale();
  const counts = distribution || [];
  const maximum = Math.max(...counts.map((item) => item.count), 1);

  return (
    <div className="distribution">
      {[5, 4, 3, 2, 1].map((rating) => {
        const item = counts.find((entry) => entry.rating === rating);
        const count = item?.count || 0;

        return (
          <div className="distribution-row" key={rating}>
            <span className="distribution-label">{rating} {t('common.stars')}</span>
            <div className="distribution-bar">
              <span style={{ width: `${(count / maximum) * 100}%` }} />
            </div>
            <span className="distribution-count">{count}</span>
          </div>
        );
      })}
      <p className="distribution-total">{t('product.basedOn', { count: total })}</p>
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
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const { isAuthenticated, cartItems, wishlistIds, toggleCartItem, toggleWishlistItem } = useShoppingState();
  const { formatPrice } = useCurrency();
  const { t, localeCode } = useLocale();
  const { data, loading, error, refetch: refetchProduct } = useQuery(PRODUCT_DETAILS, {
    variables: { id: typeof id === 'string' ? id : '' },
    skip: !router.isReady || typeof id !== 'string',
  });
  const { data: viewerReviewData, refetch: refetchViewerReview } = useQuery(VIEWER_REVIEW, {
    variables: { productId: typeof id === 'string' ? id : '' },
    skip: !router.isReady || typeof id !== 'string' || !isAuthenticated,
  });
  const [createReview, { loading: creatingReview }] = useMutation(CREATE_REVIEW);
  const [updateReview, { loading: updatingReview }] = useMutation(UPDATE_REVIEW);
  const [deleteReview, { loading: deletingReview }] = useMutation(DELETE_REVIEW);

  const viewerReview = viewerReviewData?.viewerReview;
  useEffect(() => {
    if (!viewerReview) return;
    setReviewRating(viewerReview.rating);
    setReviewTitle(viewerReview.title);
    setReviewComment(viewerReview.comment);
  }, [viewerReview]);

  if (!router.isReady || loading) {
    return (
      <Page title={t('meta.productDetails')}>
        <LoadingPage />
      </Page>
    );
  }

  if (error || !data?.product) {
    return (
        <Page title={t('meta.productDetails')}>
        <ErrorAlert message={t('product.notFound')} />
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
  const cartProduct = cartItems.find((item) => String(item.productId) === String(product.id));
  const isInCart = Boolean(cartProduct);
  const isInWishlist = wishlistIds.includes(String(product.id));
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 5);
  const category = categories[0];

  async function handleReviewSubmit(event) {
    event.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    try {
      if (viewerReview) {
        await updateReview({
          variables: {
            id: viewerReview.id,
            input: { rating: Number(reviewRating), title: reviewTitle, comment: reviewComment },
          },
        });
        setReviewSuccess(t('product.reviewUpdated'));
      } else {
        await createReview({
          variables: {
            input: {
              productId: product.id,
              rating: Number(reviewRating),
              title: reviewTitle,
              comment: reviewComment,
            },
          },
        });
        setReviewSuccess(t('product.reviewThanks'));
      }
      await Promise.all([refetchProduct(), refetchViewerReview()]);
    } catch (reviewSubmitError) {
      setReviewError(reviewSubmitError.message);
    }
  }

  async function handleReviewDelete() {
    if (!viewerReview) return;
    setReviewError('');
    setReviewSuccess('');
    try {
      await deleteReview({ variables: { id: viewerReview.id } });
      setReviewRating(5);
      setReviewTitle('');
      setReviewComment('');
      await Promise.all([refetchProduct(), refetchViewerReview()]);
      setReviewSuccess(t('product.reviewRemoved'));
    } catch (deleteError) {
      setReviewError(deleteError.message);
    }
  }

  return (
    <Page
      title={`${product.name} - ${t('common.siteName')}`}
      description={product.description}
    >
      <div className="product-details-page">
        <Link href={category ? `/category/${category.name}` : '/'}>
          <a className="back-link">
            <FaArrowLeft size={13} /> {t('product.backToProducts')}
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
                  <a className="category-chip">{t(`categories.${item.name}`) === `categories.${item.name}` ? item.label : t(`categories.${item.name}`)}</a>
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
                {Number(summary.average).toFixed(1)} ({summary.total} {t(summary.total === 1 ? 'common.review' : 'common.reviews')})
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="purchase-panel">
              <p className="price">{formatPrice(product.price)}</p>
              <div className="purchase-actions">
                <button
                  className="cart-button"
                  onClick={() => toggleCartItem(product.id)}
                >
                  {isInCart ? <FaCartArrowDown /> : <FaCartPlus />}
                  {isInCart ? t('product.removeCart') : t('product.addCart')}
                </button>
                <button
                  className="wishlist-button"
                  aria-label={
                    isInWishlist ? t('product.removeWishlist') : t('product.addWishlist')
                  }
                  onClick={() => toggleWishlistItem(product.id)}
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        </article>

        <section className="reviews-section" id="reviews">
          <div className="section-heading">
            <p className="eyebrow">{t('product.customerFeedback')}</p>
            <h2>{t('product.reviewsTitle')}</h2>
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
              <span>{summary.total} {t(summary.total === 1 ? 'common.review' : 'common.reviews')}</span>
            </div>
            <ReviewDistribution
              distribution={summary.distribution}
              total={summary.total}
            />
          </div>

          {isAuthenticated ? (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <div className="review-form-heading">
                <div>
                  <p className="eyebrow">{t('product.yourExperience')}</p>
                  <h3>{viewerReview ? t('product.editReview') : t('product.leaveReview')}</h3>
                </div>
                {viewerReview?.verified_purchase && (
                  <span className="verified-review"><FaCheckCircle size={13} /> {t('product.verifiedPurchase')}</span>
                )}
              </div>
              {reviewError && <p className="review-message error-message" role="alert">{reviewError}</p>}
              {reviewSuccess && <p className="review-message success-message" role="status">{reviewSuccess}</p>}
              <label>
                {t('product.rating')}
                <select value={reviewRating} onChange={(event) => setReviewRating(Number(event.target.value))}>
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} {t('common.stars')}</option>)}
                </select>
              </label>
              <label>
                {t('product.title')}
                <input value={reviewTitle} onChange={(event) => setReviewTitle(event.target.value)} placeholder={t('product.titlePlaceholder')} />
              </label>
              <label>
                {t('product.comment')}
                <textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} placeholder={t('product.commentPlaceholder')} rows="4" />
              </label>
              <div className="review-form-actions">
                <button type="submit" className="review-submit" disabled={creatingReview || updatingReview}>
                  {creatingReview || updatingReview ? t('product.saving') : viewerReview ? t('product.updateReview') : t('product.publishReview')}
                </button>
                {viewerReview && (
                  <button type="button" className="review-delete" onClick={handleReviewDelete} disabled={deletingReview}>
                    {deletingReview ? t('product.removing') : t('product.removeReview')}
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="review-signin">
              <p>{t('product.triedProduct')}</p>
              <Link href={`/user/login?redirect=${encodeURIComponent(`/product/${product.id}#reviews`)}`}>
                <a>{t('product.signInToReview')}</a>
              </Link>
            </div>
          )}

          <div className="review-list">
            {visibleReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-header">
                  <div>
                    <strong>{review.author_name}</strong>
                    <span className="review-date">
                      {formatReviewDate(review.created_at, localeCode)}
                    </span>
                  </div>
                  {review.verified_purchase && (
                    <span className="verified-review">
                      <FaCheckCircle size={13} /> {t('product.verifiedPurchase')}
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
              {showAllReviews ? t('product.showFewer') : t('product.showAll')}
            </button>
          )}
        </section>

        {!!product.relatedProducts?.length && (
          <section className="related-section">
            <div className="section-heading">
              <p className="eyebrow">{t('product.youMayAlsoLike')}</p>
              <h2>{t('product.relatedProducts')}</h2>
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
          color: var(--quantum-blue);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }
        .product-hero,
        .reviews-section,
        .related-section {
          box-sizing: border-box;
          width: 100%;
          padding: 30px;
          margin-bottom: 30px;
          background: #ffffff;
          border: 1px solid #edf0f5;
          border-radius: 14px;
          box-shadow: 0 12px 28px rgba(34, 55, 89, .07);
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
          background: #fafbfe;
          border-radius: 11px;
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
          background: #f0f4f8;
          color: var(--quantum-blue);
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .product-information h1 {
          margin: 0 0 18px;
          color: var(--quantum-ink);
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
          color: var(--quantum-muted);
          font-size: 14px;
        }
        .product-description {
          margin: 24px 0;
          color: var(--quantum-text);
          font-size: 16px;
          line-height: 1.7;
        }
        .purchase-panel {
          padding-top: 24px;
          border-top: 1px solid #eeeeee;
        }
        .price {
          margin: 0 0 18px;
          color: var(--quantum-ink);
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
          border-radius: 9px;
          cursor: pointer;
          font-weight: 700;
        }
        .cart-button {
          padding: 0 20px;
          background: var(--quantum-blue);
          color: #ffffff;
          transition: transform .2s, box-shadow .2s;
        }
        .cart-button:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(24,117,240,.2); }
        .wishlist-button {
          width: 44px;
          background: #f0f4f8;
          color: var(--quantum-blue);
          font-size: 18px;
        }
        .section-heading {
          margin-bottom: 24px;
        }
        .section-heading h2 {
          margin: 4px 0 0;
          color: var(--quantum-ink);
          font-size: 28px;
        }
        .eyebrow {
          margin: 0;
          color: var(--quantum-blue);
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
          border-radius: 11px;
          background: #fafbfe;
        }
        .review-form,
        .review-signin {
          padding: 22px;
          margin-bottom: 24px;
          border: 1px solid #e9edf3;
          border-radius: 10px;
          background: #fbfcfe;
        }
        .review-form-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .review-form-heading h3 { margin: 4px 0 0; color: var(--quantum-ink); font-size: 20px; }
        .review-form label {
          display: block;
          margin-top: 14px;
          color: #555555;
          font-size: 13px;
          font-weight: 700;
        }
        .review-form input,
        .review-form select,
        .review-form textarea {
          box-sizing: border-box;
          width: 100%;
          margin-top: 7px;
          padding: 11px 12px;
          border: 1px solid #dce2eb;
          border-radius: 9px;
          background: #ffffff;
          color: #444444;
          font: inherit;
          font-size: 14px;
        }
        .review-form textarea { resize: vertical; line-height: 1.5; }
        .review-form-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
        .review-submit,
        .review-delete {
          min-height: 40px;
          padding: 0 16px;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 700;
        }
        .review-submit { border: 0; background: var(--quantum-blue); color: #ffffff; }
        .review-delete { border: 1px solid #e1a0a0; background: #ffffff; color: #b54747; }
        .review-submit:disabled,
        .review-delete:disabled { cursor: wait; opacity: 0.6; }
        .review-message { margin: 12px 0 0; font-size: 13px; }
        .error-message { color: #b54747; }
        .success-message { color: #25965a; }
        .review-signin { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .review-signin p { margin: 0; color: var(--quantum-text); font-size: 14px; }
        .review-signin a { color: var(--quantum-blue); font-size: 14px; font-weight: 700; text-decoration: none; }
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
          border: 1px solid #edf0f5;
          border-radius: 10px;
          background: #ffffff;
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
          color: var(--quantum-ink);
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
          color: var(--quantum-ink);
          font-size: 15px;
        }
        .review-card p {
          margin: 0;
          color: var(--quantum-text);
          font-size: 14px;
          line-height: 1.6;
        }
        .show-reviews-button {
          padding: 0 18px;
          margin-top: 22px;
          border: 1px solid var(--quantum-blue);
          background: #ffffff;
          color: var(--quantum-blue);
        }
        @media (max-width: 800px) {
          .product-details-page {
            width: 100%;
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
            width: 100%;
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
          .review-signin { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </Page>
  );
}
