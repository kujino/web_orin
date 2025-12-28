import './Header.css';

const Header = () => {
  return (
    <button className="menu-button" aria-label="menu">
      <img
        src="/menu.png"
        alt="メニューボタン"
        className="menu-icon"
      />
    </button>
  );
};

export default Header;
