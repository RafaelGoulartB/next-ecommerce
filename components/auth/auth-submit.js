export default function AuthSubmit({ loading, children }) {
  return (
    <button className="submit" type="submit" disabled={loading}>
      {loading ? 'Please wait…' : children}
      <style jsx>{`
        .submit {
          width: 100%;
          min-height: 52px;
          margin-top: 8px;
          border: 0;
          border-radius: 10px;
          background: #1875f0;
          color: #ffffff;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 800;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(24, 117, 240, 0.22); }
        .submit:disabled { cursor: wait; opacity: 0.65; }
      `}</style>
    </button>
  );
}
