import { useQuery } from '@apollo/client';
import { VIEWER } from '../../apollo/client/queries';

import HeaderMobile from './header-mobile';
import HeaderDesktop from './header-desktop';

export default function Header() {
  const { data, loading, error } = useQuery(VIEWER);
  const viewer = data?.viewer;

  return (
    <header>
      <nav id="mobile">
        <HeaderMobile viewer={viewer} />
      </nav>

      <nav id="desktop">
        <HeaderDesktop viewer={viewer} />
      </nav>

      <style jsx>{`
        header {
          width: 100vw;
          display: flex;
          flex-direction: column;
          margin-bottom: 34px;
          background-color: #ffffff;
          border-bottom: 1px solid var(--quantum-border);
          box-shadow: 0 8px 24px rgba(34, 55, 89, 0.05);
        }
        #mobile {
          display: none;
          z-index: 0;
        }
        @media (max-width: 1000px) {
          #mobile {
            display: flex;
            z-index: 1;
          }
          #desktop {
            display: none;
            z-index: 0;
          }
        }
      `}</style>
    </header>
  );
}
