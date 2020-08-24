import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES } from '../apollo/queries';

import Link from 'next/link';
import {
  MdDesktopWindows,
  MdDesktopMac,
  MdLaptop,
  MdKeyboard,
  MdMemory,
  MdSpeaker,
  MdSmartphone,
  MdTv,
  MdVideogameAsset,
  MdWatch,
  MdKeyboardArrowRight,
} from 'react-icons/md';

const iconSlugs = {
  MdDesktopWindows,
  MdDesktopMac,
  MdLaptop,
  MdKeyboard,
  MdMemory,
  MdSpeaker,
  MdSmartphone,
  MdTv,
  MdVideogameAsset,
  MdWatch,
};

export default function AsideCategories() {
  const { data, loading, error } = useQuery(CATEGORIES);

  if (loading) return <></>;

  if (error) return <></>;

  return (
    <ul className="categories">
      {data.categories.map((category) => {
        const Icon = iconSlugs[category.md_icon];
        return (
          <li key={category.id}>
            <Link href={`/category/${category.name}`}>
              <a>
                <div className="content">
                  <div className="icon">
                    <Icon color="#D8D8D8" size="22" />
                  </div>
                  <p>{category.label}</p>
                </div>
                <div className="arrow-button">
                  <MdKeyboardArrowRight color="#D8D8D8" size="26" />
                </div>
              </a>
            </Link>
          </li>
        );
      })}

      <style jsx>{`
        .categories {
          width: 255px;
          max-width: 255px;
          background: #ffff;
          border-radius: 6px;
          margin-bottom: 30px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        .categories li a {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 18px;
          text-decoration: none;
          font-weight: 500;
          font-size: 13px;
          color: #808080;
          border-bottom: 2px solid #f5f5f5;
          transition: 0.4s;
        }
        .categories li a:hover {
          background: #f2f2f2;
        }
        .categories li a .content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .categories li a .content .icon {
          padding-right: 18px;
        }
        .categories li a .arrow-button {
          align-self: flex-end;
        }
        @media (max-width: 1000px) {
          .categories {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}
