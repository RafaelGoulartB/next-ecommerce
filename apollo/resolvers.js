import { GraphQLError } from 'graphql';
import {
  createUser,
  findUser,
  findUserById,
  normalizeEmail,
  updateUserName,
  validatePassword,
} from '../lib/user';
import { listCategories } from '../lib/category';
import {
  listProducts,
  findProduct,
  findProductCategories,
  findRelatedProducts,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  findProductsById,
} from '../lib/product';
import {
  createReview,
  deleteReview,
  findViewerReview,
  getReviewSummary,
  listReviewsByProduct,
  updateReview,
} from '../lib/review';
import { setLoginSession, getLoginSession } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';
import { getViewer, requireViewer } from '../lib/authorization';
import {
  addToCart,
  clearCart,
  getCart,
  mergeGuestCart,
  removeFromCart,
  updateCartItem,
} from '../lib/cart';
import {
  listWishlist,
  mergeGuestWishlist,
  toggleWishlist,
} from '../lib/wishlist';
import { createOrder, findOrder, listOrders } from '../lib/order';
import { connection } from '../db/connection';

function inputError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

export const resolvers = {
  Query: {
    async user(_parent, args) {
      return findUserById({ id: args.id });
    },
    async users() {
      return connection('user').select(
        'id',
        'name',
        'email',
        'createdAt'
      );
    },
    async viewer(_parent, _args, context) {
      const token = context.req?.headers?.cookie;
      const viewer = await getViewer(context);
      if (token && !viewer) removeTokenCookie(context.res);
      return viewer;
    },
    async products(_parent, args) {
      try {
        return listProducts({
          sort: args.sort,
          category: args.category,
          search: args.search,
        });
      } catch (error) {
        throw new Error('It is not possible list products');
      }
    },
    async productsById(_parent, args) {
      try {
        return await findProductsById({ id: args.id });
      } catch (error) {
        throw new Error('It is not possible list products');
      }
    },
    async product(_parent, args) {
      try {
        return await findProduct({ id: args.id });
      } catch (error) {
        throw new Error('It is not possible list product');
      }
    },
    async categories() {
      return listCategories();
    },
    async myCart(_parent, _args, context) {
      const viewer = await requireViewer(context);
      return getCart({ userId: viewer.id });
    },
    async myWishlist(_parent, _args, context) {
      const viewer = await requireViewer(context);
      return listWishlist({ userId: viewer.id });
    },
    async myOrders(_parent, _args, context) {
      const viewer = await requireViewer(context);
      return listOrders({ userId: viewer.id });
    },
    async order(_parent, args, context) {
      const viewer = await requireViewer(context);
      return findOrder({ userId: viewer.id, id: args.id });
    },
    async viewerReview(_parent, args, context) {
      const viewer = await requireViewer(context);
      return findViewerReview({ productId: args.productId, userId: viewer.id });
    },
  },
  Product: {
    async categories(product) {
      return findProductCategories({ productId: product.id });
    },
    async reviews(product) {
      return listReviewsByProduct({ productId: product.id });
    },
    async reviewSummary(product) {
      return getReviewSummary({ productId: product.id });
    },
    async rating(product) {
      const summary = await getReviewSummary({ productId: product.id });
      return String(summary.total ? summary.average : product.rating);
    },
    async relatedProducts(product) {
      return findRelatedProducts({ productId: product.id });
    },
  },
  CartItem: {
    product(item) {
      return item.product;
    },
    productId(item) {
      return item.productId || item.product?.id;
    },
  },
  Mutation: {
    async signUp(_parent, args, context) {
      try {
        const input = {
          ...args.input,
          email: normalizeEmail(args.input.email),
        };
        if (await findUser({ email: input.email })) {
          throw inputError('Email is already in use, try to login');
        }
        const user = await createUser(input);
        await setLoginSession(context.res, { id: user.id, email: user.email });
        return { user };
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw inputError(error.message);
      }
    },
    async signIn(_parent, args, context) {
      const email = normalizeEmail(args.input.email);
      const user = await findUser({ email });
      if (user && (await validatePassword(user, args.input.password))) {
        await setLoginSession(context.res, { id: user.id, email: user.email });
        return { user };
      }
      throw inputError('Invalid email and password combination');
    },
    async signOut(_parent, _args, context) {
      removeTokenCookie(context.res);
      return true;
    },
    async updateProfile(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return updateUserName({ id: viewer.id, name: args.name });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async addToCart(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return addToCart({ userId: viewer.id, ...args });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async updateCartItem(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return updateCartItem({ userId: viewer.id, ...args });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async removeFromCart(_parent, args, context) {
      const viewer = await requireViewer(context);
      return removeFromCart({ userId: viewer.id, productId: args.productId });
    },
    async mergeGuestCart(_parent, args, context) {
      const viewer = await requireViewer(context);
      return mergeGuestCart({ userId: viewer.id, items: args.items });
    },
    async clearCart(_parent, _args, context) {
      const viewer = await requireViewer(context);
      return clearCart({ userId: viewer.id });
    },
    async toggleWishlist(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return toggleWishlist({ userId: viewer.id, productId: args.productId });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async mergeGuestWishlist(_parent, args, context) {
      const viewer = await requireViewer(context);
      return mergeGuestWishlist({ userId: viewer.id, productIds: args.productIds });
    },
    async createOrder(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return createOrder({ userId: viewer.id, ...args.input });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async createReview(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return createReview({ productId: args.input.productId, user: viewer, review: args.input });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async updateReview(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return updateReview({ id: args.id, user: viewer, review: args.input });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async deleteReview(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return deleteReview({ id: args.id, userId: viewer.id });
      } catch (error) {
        throw inputError(error.message);
      }
    },
    async createProduct(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        return { product: await CreateProduct(args.input, viewer.id) };
      } catch (error) {
        throw new Error('It is not possible create a new product');
      }
    },
    async deleteProduct(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        await DeleteProduct({ id: args.id, userId: viewer.id });
        return true;
      } catch (error) {
        throw new Error('It is not possible delete the product');
      }
    },
    async updateProduct(_parent, args, context) {
      const viewer = await requireViewer(context);
      try {
        const product = await UpdateProduct(args.id, args.input, viewer.id);
        return { product };
      } catch (error) {
        throw new Error('It is not possible update the product');
      }
    },
  },
};
