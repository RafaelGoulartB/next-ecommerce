export default function ProductsGrid({ children, viewMode = 'grid' }) {
  return (
    <div className={`products-grid ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
      {children}
      <style jsx>{`
        .products-grid {
          display: grid;
          gap: 20px;
        }
        .products-grid.grid-view {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .products-grid.list-view {
          grid-template-columns: minmax(0, 1fr);
          gap: 14px;
        }
        @media (min-width: 1650px) {
          .products-grid.grid-view {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 1360px) {
          .products-grid.grid-view {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 700px) {
          .products-grid.grid-view {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
