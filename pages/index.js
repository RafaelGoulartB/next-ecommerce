import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Page from '../components/page';
import AlertError from '../components/alerts/error';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      email
    }
  }
`;

export default function Index() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  // const shouldRedirect = !(loading || error || viewer);

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/login');
  //   }
  // }, [shouldRedirect]);

  if (error) return <AlertError>{error.message}</AlertError>;

  if (loading) return <p>Loading...</p>;

  return (
    <Page>
      {viewer && (
        <Link href="/signout">
          <a>signout</a>
        </Link>
      )}
      <p>Test</p>
    </Page>
  );
}
