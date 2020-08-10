export default function LoadingPage() {
  return (
    <div className="loading">
      <p>Loading...</p>

      <style jsx>{`
        .loading {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
          font-size: 1.6rem;
        }
      `}</style>
    </div>
  );
}
