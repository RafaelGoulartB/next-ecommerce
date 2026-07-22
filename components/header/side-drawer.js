import Link from 'next/link';
import { useQuery } from '@apollo/client';
import SearchBox from '../search-box';
import CurrencySelector from '../currency-selector';
import LanguageSelector from '../language-selector';
import useLocale from '../../hooks/use-locale';
import { GET_DRAWER_STATE, GUEST_CART, MY_CART } from '../../apollo/client/queries';

export default function SideDrawer({ closeDrawer, viewer }) {
  const { t } = useLocale();
  const { data } = useQuery(GET_DRAWER_STATE);
  const { data: guestCartData } = useQuery(GUEST_CART);
  const { data: myCartData } = useQuery(MY_CART, { skip: !viewer });
  const itemCount = viewer
    ? myCartData?.myCart?.itemCount || 0
    : guestCartData?.guestCart?.itemCount || 0;

  return (
    <div className={`side-drawer ${data?.isDrawerOpen ? 'show' : 'hide'}`} id="side-drawer">
      <button className="close-drawer" onClick={closeDrawer} aria-label={t('header.closeMenu')}>×</button>
      <div className="search"><SearchBox /></div>
      <ul className="items">
        <li className="item"><Link href="/cart"><a onClick={closeDrawer}>{t('header.cart')} <span>{itemCount}</span></a></Link></li>
        <li className="item"><Link href="/wishlist"><a onClick={closeDrawer}>{t('header.wishlist')}</a></Link></li>
        {viewer ? (
          <>
            <li className="item"><Link href="/profile"><a onClick={closeDrawer}>{viewer.name}</a></Link></li>
            <li className="item"><Link href="/user/signout"><a onClick={closeDrawer}>{t('header.signOut')}</a></Link></li>
          </>
        ) : (
          <li className="item"><Link href="/user/login"><a onClick={closeDrawer}>{t('header.signIn')}</a></Link></li>
        )}
        <li className="item currency-item"><span>{t('common.currency')}</span><CurrencySelector /></li>
        <li className="item currency-item"><span>{t('common.language')}</span><LanguageSelector /></li>
      </ul>
      <style jsx>{`
        .side-drawer { display: flex; flex-direction: column; position: fixed; z-index: 999; top: 0; left: 0; width: min(86%, 360px); height: 100vh; box-sizing: border-box; background: #fff; box-shadow: 12px 0 30px rgba(34,55,89,.14); transform: translateX(-100%); transition: transform .3s ease-out; }
        .side-drawer.show { transform: translateX(0); }
        .search { padding: 0 24px; margin-top: 8px; width: 100%; align-self: center; }
        .items { width: 100%; padding-top: 24px; box-sizing: border-box; }
        .item + .item { margin-top: 0; padding-top: 0; border-top: 1px solid #eef1f5; }
        .item a { display: flex; justify-content: space-between; padding: 18px 28px; color: var(--quantum-ink); text-decoration: none; font-size: 15px; font-weight: 700; }
        .item a:hover { background: #f6f8fb; color: var(--quantum-ink); }
        .item a span { color: var(--quantum-blue); }
        .currency-item { display: flex; align-items: center; justify-content: space-between; padding: 0 28px; color: var(--quantum-ink); font-size: 15px; font-weight: 700; }
        .currency-item :global(select) { color: var(--quantum-ink); }
        .close-drawer { width: 100%; padding: 16px 24px 8px; border: 0; background: none; color: var(--quantum-muted); cursor: pointer; font-size: 28px; text-align: right; }
      `}</style>
    </div>
  );
}
