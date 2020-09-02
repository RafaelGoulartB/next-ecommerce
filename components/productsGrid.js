export default function ProductsGrid({ children }) {
  return (
    <div className="products-grid">
      {children}
      <style jsx>{`
        .products-grid {
          display: grid;
          grid-gap: 28px;
          grid: auto-flow / 1fr 1fr 1fr;
        }
        @media (min-width: 1650px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr 1fr 1fr;
          }
        }
        @media (max-width: 1360px) {
          .products-grid {
            grid: auto-flow / 1fr 1fr;
          }
        }
        @media (max-width: 700px) {
          .products-grid {
            grid: auto-flow / 1fr;
          }
        }
      `}</style>
    </div>
  );
}
