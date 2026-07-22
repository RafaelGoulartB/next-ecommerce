import { GraphQLError } from 'graphql';
import { createUser, findUser, validatePassword } from '../lib/user';
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
import { getReviewSummary, listReviewsByProduct } from '../lib/review';
import { setLoginSession, getLoginSession } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email });
        }
      } catch (error) {
        throw new GraphQLError(
          'Authentication token is invalid, please log in',
          { extensions: { code: 'UNAUTHENTICATED' } }
        );
      }
    },
    async products(_parent, args, _context, _info) {
      try {
        if (args.sort && args.category)
          return listProducts({ sort: args.sort, category: args.category });
        else if (args.sort) return listProducts({ sort: args.sort });
        else if (args.category)
          return listProducts({ category: args.category });
        return listProducts({ sort: false, category: false });
      } catch (error) {
        throw new Error('It is not possible list products');
      }
    },
    async productsById(_parent, args, _context, _info) {
      try {
        return await findProductsById({ id: args.id });
      } catch (error) {
        throw new Error('It is not possible list products');
      }
    },
    async product(_parent, args, _context, _info) {
      try {
        return await findProduct({ id: args.id });
      } catch (error) {
        throw new Error('It is not possible list product');
      }
    },
    async categories(_parent, _args, _context, _info) {
      try {
        return listCategories();
      } catch (error) {
        throw new Error('It is not possible list categories');
      }
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
    async relatedProducts(product) {
      return findRelatedProducts({ productId: product.id });
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const userExist = await findUser({ email: args.input.email });

      if (userExist)
        throw new GraphQLError('email is already in use, try to login', {
          extensions: { code: 'BAD_USER_INPUT' },
        });

      const user = await createUser(args.input);
      return { user };
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email });

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        };

        await setLoginSession(context.res, session);

        return { user };
      }

      throw new GraphQLError('Invalid email and password combination', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },
    async createProduct(_parent, args, _context, _info) {
      try {
        const product = await CreateProduct(args.input);

        return { product };
      } catch (error) {
        throw new Error('It is not possible create a new product');
      }
    },
    async deleteProduct(_parent, args, _context, _info) {
      try {
        await DeleteProduct({ id: args.id });
        return true;
      } catch (error) {
        throw new Error('It is not possible delete the product');
      }
    },
    async updateProduct(_parent, args, _context, _info) {
      try {
        const product = await UpdateProduct(args.id, args.input);
        return { product };
      } catch (error) {
        throw new Error('it is not possible update the product');
      }
    },
  },
};
