export default function SideDrawer() {
  return (
    <div className="sideDrawer">
      <ul className="items">
        <li id="home" className="item">
          <a href="/">Home</a>
        </li>
        <li id="about" className="item">
          <a href="/about">About</a>
        </li>
        <li id="contact" className="item">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <style jsx>{`
        .sideDrawer {
          display: none;
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          width: 80%;
          height: 100vh;
          background: #fff;
          box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
