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

export default function CategoriesItem({ category }) {
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

      <style jsx>{`
        li a {
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
        li a:hover {
          background: #f2f2f2;
        }
        li a .content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        li a .content .icon {
          padding-right: 18px;
        }
        li a .arrow-button {
          align-self: flex-end;
        }
      `}</style>
    </li>
  );
}
