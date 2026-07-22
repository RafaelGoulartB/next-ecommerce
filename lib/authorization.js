import { GraphQLError } from 'graphql';
import { findUserById } from './user';
import { getLoginSession } from './auth';

export async function getViewer(context) {
  try {
    const session = await getLoginSession(context.req);
    if (!session?.id) return null;
    return findUserById({ id: session.id });
  } catch (error) {
    return null;
  }
}

export async function requireViewer(context) {
  const viewer = await getViewer(context);
  if (!viewer) {
    throw new GraphQLError('Please sign in to continue', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return viewer;
}
