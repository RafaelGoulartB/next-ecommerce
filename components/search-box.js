import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  return (
    <>
      <div className="search-box">
        <button className="search-button">
          <FaSearch color="#7f8d9c" size="14px" />
        </button>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search goods"
        />
        <select id="categories-search" name="categories-search">
          <option value="" selected>
            Category
          </option>
          <option value="#">Desktop</option>
            <option value="#">Smartphone</option>
            <option value="#">Watches</option>
            <option value="#">Games</option>
            <option value="#">Laptop</option>
            <option value="#">Keyboards</option>
            <option value="#">TV & Video</option>
            <option value="#">Accessories</option>
        </select>
      </div>
      <style jsx>{`
        .search-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: min(380px, 35vw);
          padding: 0 14px;
          height: 44px;
          background: #fbfcfe;
          border: 1px solid var(--quantum-border);
          box-sizing: border-box;
          border-radius: 10px;
          transition: border-color .2s, box-shadow .2s;
        }
        .search-box:focus-within { border-color: var(--quantum-blue); box-shadow: 0 0 0 4px rgba(24,117,240,.1); }
        .search-box .search-button {
          display: flex;
          align-items: center;
          padding: 0;
          background: none;
          border: none;
          height: 100%;
          cursor: pointer;
        }
        .search-box .search-button:focus {
          outline: none;
        }
        .search-box .search-button:hover {
          opacity: 40%;
        }
        .search-box input {
          flex: 1;
          height: 100%;
          border: none;
          padding: 0 10px;
          background: transparent;
          color: var(--quantum-ink);
        }
        .search-box input:focus {
          outline: none;
        }
        .search-box select {
          align-self: flex-end;
          padding-left: 10px;
          max-width: 120px;
          height: 100%;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--quantum-muted);
          border: none;
          background: none;
        }
        .search-box select:focus {
          outline: none;
        }
        @media (max-width: 1100px) { .search-box { width: min(330px, 32vw); } }
        @media (max-width: 1000px) { .search-box { width: 100%; } }
      `}</style>
    </>
  );
}
