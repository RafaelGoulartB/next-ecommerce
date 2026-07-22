export default function Profile({ title }) {
  return (
    <>
      <h2>{title}</h2>
      <style jsx>{`
        h2 {
          font-weight: 900;
          font-size: 38px;
          letter-spacing: -1px;
          color: var(--quantum-ink);
          margin-top: 6px;
          margin-bottom: 24px;
          align-self: flex-start;
        }
        @media (max-width: 560px) { h2 { font-size: 30px; } }
      `}</style>
    </>
  );
}
