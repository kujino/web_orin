import './Header.css';

type Props = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setMenuOpen }: Props) => {
  return (
    <button
      className="menu-button"
      onClick={() => setMenuOpen(prev => !prev)}
      aria-label="menu"
    >
      <img
        src="/menu.png"
        alt="メニューボタン"
        className="menu-icon"
      />
    </button>
  );
};

export default Header;
