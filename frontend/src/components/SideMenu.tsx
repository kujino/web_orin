import "./SideMenu.css";

type Props = {
  open: boolean;
};

const SideMenu = ({ open }: Props) => {
  return (
    <aside className={`side-menu ${open ? "open" : ""}`}>
      <ul>
        <p>WebOrin</p>
        <li>当アプリについて</li>
        <li>コメントする</li>
      </ul>
    </aside>
  );
};

export default SideMenu;