import '../public/reset.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { useEffect } from 'react';
import { hydrateGuestState } from '../apollo/client/cache';
import AuthSessionSync from '../components/auth-session-sync';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    hydrateGuestState();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthSessionSync />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
