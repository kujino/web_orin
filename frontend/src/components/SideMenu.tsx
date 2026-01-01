import "./SideMenu.css";
import SideMenuContent from "./SideMenuContent";

type Props = {
  open: boolean;
  activeSection: "about" | "comment" | null;
  setActiveSection: React.Dispatch<
    React.SetStateAction<"about" | "comment" | null>
  >;
  bellCount: number | null;
};

const SideMenu = ({
  open,
  activeSection,
  setActiveSection,
  bellCount,
}: Props) => {
  if (!open) return null;

  // ★ 追加：トグル用ハンドラ
  const handleToggle = (section: "about" | "comment") => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <aside className="side-menu open">
      <ul>
        <h1 className="app-title">Web Orin</h1>

        <li>
          <button
            className="menu-link"
            onClick={() => handleToggle("about")}
          >
            <span className="menu-text">当アプリについて</span>

            {activeSection === "about" && (
              <span className="menu-toggle">−</span>
            )}
          </button>
        </li>

        <li>
          <button
            className="menu-link"
            onClick={() => handleToggle("comment")}
          >
            <span className="menu-text">コメント</span>

            {activeSection === "comment" && (
              <span className="menu-toggle">−</span>
            )}
          </button>
        </li>
      </ul>

      <div className="menu-content">
        <SideMenuContent
          activeSection={activeSection}
          bellCount={bellCount}
        />
      </div>
    </aside>
  );
};

export default SideMenu;
