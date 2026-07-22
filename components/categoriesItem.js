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
              <Icon color="#8a98a7" size="20" />
            </div>
            <p>{category.label}</p>
          </div>
          <div className="arrow-button">
            <MdKeyboardArrowRight color="#b2bccb" size="24" />
          </div>
        </a>
      </Link>

      <style jsx>{`
        li a {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          text-decoration: none;
          font-weight: 500;
          font-size: 13px;
          color: #596477;
          border-bottom: 1px solid #eef1f5;
          transition: background .2s, color .2s;
        }
        li a:hover {
          background: #f6f8fb;
          color: var(--quantum-ink);
        }
        li a .content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        li a .content .icon {
          padding-right: 14px;
        }
        li a .arrow-button {
          color: #b2bccb;
        }
      `}</style>
    </li>
  );
}
