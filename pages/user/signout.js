import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_OUT } from '../../apollo/client/mutations';
import { clearGuestCart, clearGuestWishlist } from '../../apollo/client/cache';
import useLocale from '../../hooks/use-locale';

export default function SignOut() {
  const { t } = useLocale();
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT);

  useEffect(() => {
    let active = true;
    signOut()
      .catch(() => null)
      .finally(async () => {
        if (!active) return;
        clearGuestCart();
        clearGuestWishlist();
        await client.clearStore();
        router.replace('/user/login');
      });
    return () => { active = false; };
  }, [client, router, signOut]);

  return <p style={{ padding: '32px', fontFamily: 'Roboto, sans-serif' }}>{t('auth.signingOut')}</p>;
}
