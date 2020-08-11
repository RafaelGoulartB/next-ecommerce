import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  return (
    <>
      <div className="search-box">
        <button className="search-button">
          <FaSearch color="#D8D8D8" size="15px" />
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
          <option value="DB">DB</option>
        </select>
      </div>
      <style jsx>{`
        .search-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 12px;
          padding-right: 12px;
          height: 42px;
          background: #ffffff;
          border: 2px solid #f5f5f5;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .search-box .search-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          height: 100%;
        }
        .search-box .search-button:focus {
          outline: none;
        }
        .search-box .search-button:hover {
          opacity: 40%;
        }
        .search-box input {
          width: 75%;
          height: 100%;
          border: none;
          padding-left: 8px;
        }
        .search-box input:focus {
          outline: none;
        }
        .search-box select {
          align-self: flex-end;
          max-width: 120px;
          height: 100%;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 1px;
          color: #b2b2b2;
          border: none;
          background: none;
        }
        .search-box select:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}
