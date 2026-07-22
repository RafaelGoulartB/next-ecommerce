import { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useLocale from '../hooks/use-locale';

const heroSlides = [
  {
    id: 1,
    eyebrow: 'weeklyFeature',
    title: 'weeklyTitle',
    description: 'weeklyDescription',
    image: '/products/71xe2bDZ0nL._AC_UX679_.jpg',
    background: 'linear-gradient(110deg, #e6eef7 0%, #f8fbff 58%, #dbe7f2 100%)',
  },
  {
    id: 2,
    eyebrow: 'gamingExperience',
    title: 'gamingTitle',
    description: 'gamingDescription',
    image: '/products/61JnrafZ7zL._AC_SL1457_.jpg',
    background: 'linear-gradient(110deg, #e8f1ff 0%, #f6faff 58%, #d8e7ff 100%)',
  },
  {
    id: 3,
    eyebrow: 'smartChoice',
    title: 'smartTitle',
    description: 'smartDescription',
    image: '/products/81hCytKTUTL.jpg',
    background: 'linear-gradient(110deg, #eef3e9 0%, #fbfdf9 58%, #e4edde 100%)',
  },
];

export default function ProductShowcase() {
  const { t } = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  }

  return (
    <section className="showcase" aria-label={t('home.featuredProducts')}>
      <div className="hero" style={{ background: slide.background }}>
        <div className="hero-copy">
          <p className="eyebrow">{t(`home.${slide.eyebrow}`)}</p>
          <h1>{t(`home.${slide.title}`)}</h1>
          <p className="hero-description">{t(`home.${slide.description}`)}</p>
          <Link href={`/product/${slide.id}`}>
            <a className="hero-link">
              {t('home.shopNow')} <FaArrowRight size={12} />
            </a>
          </Link>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-glow" />
          <img src={slide.image} alt="" />
        </div>

        <button
          type="button"
          className="hero-arrow hero-arrow-left"
          onClick={showPreviousSlide}
          aria-label={t('home.previousFeature')}
        >
          <FaChevronLeft size={13} />
        </button>
        <button
          type="button"
          className="hero-arrow hero-arrow-right"
          onClick={showNextSlide}
          aria-label={t('home.nextFeature')}
        >
          <FaChevronRight size={13} />
        </button>

        <div className="hero-dots" aria-label={t('home.selectFeature')}>
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={t('home.goToFeature', { count: index + 1 })}
              aria-current={index === activeSlide ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .showcase {
          width: 100%;
          margin-bottom: 32px;
        }
        .hero {
          position: relative;
          min-height: 280px;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-radius: 16px;
          isolation: isolate;
          box-shadow: 0 16px 36px rgba(34, 55, 89, .08);
        }
        .hero:before,
        .hero:after {
          content: '';
          position: absolute;
          z-index: -1;
          border: 1px solid rgba(96, 123, 150, .12);
          border-radius: 50%;
        }
        .hero:before {
          top: -265px;
          right: 120px;
          width: 470px;
          height: 470px;
        }
        .hero:after {
          right: -40px;
          bottom: -410px;
          width: 560px;
          height: 560px;
        }
        .hero-copy {
          position: relative;
          z-index: 2;
          width: 47%;
          padding: 42px 0 42px 74px;
        }
        .eyebrow {
          margin-bottom: 12px;
          color: #72859a;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
        }
        h1 {
          max-width: 470px;
          margin-bottom: 12px;
          color: var(--quantum-ink);
          font-size: clamp(28px, 3.3vw, 43px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.08;
        }
        .hero-description {
          max-width: 360px;
          margin-bottom: 24px;
          color: #6c7c8f;
          font-size: 14px;
          line-height: 1.6;
        }
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 12px 18px;
          border-radius: 7px;
          background: var(--quantum-ink);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s, background .2s;
        }
        .hero-link:hover { transform: translateY(-2px); background: #41526a; }
        .hero-visual {
          position: absolute;
          z-index: 1;
          top: 0;
          right: 8%;
          width: 45%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-visual img {
          position: relative;
          z-index: 2;
          width: min(270px, 62%);
          height: 245px;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 24px 18px rgba(44, 59, 77, .2));
          animation: product-float .45s ease-out;
        }
        .visual-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .48);
          filter: blur(2px);
        }
        .hero-arrow {
          position: absolute;
          z-index: 3;
          top: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(37, 43, 58, .76);
          color: #ffffff;
          cursor: pointer;
          transform: translateY(-50%);
          transition: transform .2s, background .2s;
        }
        .hero-arrow:hover { background: var(--quantum-ink); transform: translateY(-50%) scale(1.06); }
        .hero-arrow-left { left: 22px; }
        .hero-arrow-right { right: 22px; }
        .hero-dots {
          position: absolute;
          z-index: 3;
          bottom: 18px;
          left: 50%;
          display: flex;
          gap: 7px;
          transform: translateX(-50%);
        }
        .hero-dots button {
          width: 22px;
          height: 3px;
          padding: 0;
          border: 0;
          border-radius: 4px;
          background: rgba(96, 123, 150, .28);
          cursor: pointer;
          transition: width .2s, background .2s;
        }
        .hero-dots button.active { width: 34px; background: var(--quantum-ink); }
        @keyframes product-float {
          from { opacity: .35; transform: translateX(16px) scale(.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @media (max-width: 900px) {
          .hero-copy { width: 60%; padding-left: 48px; }
          .hero-visual { right: -4%; width: 53%; }
        }
        @media (max-width: 620px) {
          .hero { min-height: 400px; align-items: flex-start; }
          .hero-copy { width: 100%; padding: 34px 34px 0; }
          .hero-copy h1 { max-width: 300px; font-size: 31px; }
          .hero-visual { top: 132px; right: 0; width: 100%; height: 235px; }
          .hero-visual img { width: 190px; height: 205px; }
          .hero-arrow { top: auto; bottom: 20px; transform: none; }
          .hero-arrow:hover { transform: scale(1.06); }
          .hero-arrow-left { left: 20px; }
          .hero-arrow-right { right: 20px; }
          .hero-dots { bottom: 38px; }
        }
      `}</style>
    </section>
  );
}
