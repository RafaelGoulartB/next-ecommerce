import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import typeDefs from '../../typeDefs';
import resolvers from '../../resolvers/user';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
});

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default cors(handler);
