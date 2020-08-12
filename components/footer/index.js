import FooterDesktop from './footer-desktop';
import FooterMobile from './footer-mobile';

export default function Fotter() {
  return (
    <footer>
      <div id="mobile">
        <FooterMobile />
      </div>

      <div id="desktop">
        <FooterDesktop />
      </div>

      <style jsx>{`
        footer {
          width: 100vw;
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          background-color: #ffffff;
          box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.05);
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          overflow-x: hidden;
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
    </footer>
  );
}
