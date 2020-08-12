import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmazonPay,
} from 'react-icons/fa';
import Logo from './logo';

export default function Fotter() {
  return (
    <footer>
      <div className="footer footer-top">
        <Logo />

        <div className="footer-nav">
          <Link href="/">
            <a>Shop</a>
          </Link>
          <Link href="/">
            <a>Journal</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/">
            <a>Contacts</a>
          </Link>
        </div>

        <div className="social-links">
          <Link href="/">
            <a>
              <FaFacebookF color="#d8d8d8" size="18px" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <FaTwitter color="#d8d8d8" size="18px" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <FaInstagram color="#d8d8d8" size="18px" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <FaYoutube color="#d8d8d8" size="18px" />
            </a>
          </Link>
        </div>
      </div>
      <div className="footer footer-bottom">
        <div className="texts">
          <p>© 2016. Quantum UI kit</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </div>
        <div className="payment-info">
          <p className="text">Accepted payment methods</p>
          <div className="payment-methods">
            <div>
              <FaCcVisa color="#424242" size="32px" />
            </div>
            <div>
              <FaCcMastercard color="#424242" size="32px" />
            </div>
            <div>
              <FaCcPaypal color="#424242" size="32px" />
            </div>
            <div>
              <FaCcAmazonPay color="#424242" size="32px" />
            </div>
          </div>
        </div>
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
        .footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 28px 10vw;
        }
        .footer-top .footer-nav {
          display: flex;
          align-items: center;
        }
        .footer-top .footer-nav a {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          color: #666666;
          text-decoration: none;
          margin-left: 18px;
          margin-right: 18px;
        }
        .footer-top .footer-nav a:hover {
          text-decoration: underline;
        }
        .footer-top .social-links a {
          margin-left: 12px;
          margin-right: 12px;
        }
        /* Footer Bottom */
        .footer-bottom {
          border-top: 2px solid #f5f5f5;
        }
        .footer-bottom .texts {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .footer-bottom .texts p {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 60px;
          color: #b3b3b3;
          margin-right: 15px;
          margin-left: 15px;
        }
        .footer-bottom .payment-info {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .footer-bottom .payment-info .text {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 60px;
          color: #b3b3b3;
        }
        .footer-bottom .payment-info .payment-methods {
          display: flex;
          flex-direction: row;
          margin-left: 12px;
        }
        .footer-bottom .payment-info .payment-methods div {
          margin-left: 5px;
          margin-right: 5px;
        }

        @media (max-width: 1000px) {
          .footer-top .footer-nav {
            display: none;
          }
          .footer-bottom {
            display: flex;
            flex-direction: column;
          }
          .footer-bottom .texts {
            flex-direction: column;
          }
          .footer-bottom .texts p {
            line-height: 40px;
          }
          .footer-bottom .payment-info .text {
            display: none;
          }
          .footer-bottom .payment-info {
            margin-top: 24px;
          }
        }
        @media (max-width: 700px) {
          .footer-top {
            display: flex;
            flex-direction: column;
          }
          .footer-top .social-links {
            margin-top: 8px;
          }
        }
      `}</style>
    </footer>
  );
}
