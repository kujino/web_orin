import "./SideMenu.css";

type Props = {
  open: boolean;
  activeSection: "about" | "comment" | null;
  setActiveSection: (section: "about" | "comment") => void;
};


const SideMenu = ({
  open,
  activeSection,
  setActiveSection,
}: Props) => {
  if (!open) return null;

  return (
    <aside className="side-menu open">
      <ul>
        <h1 className="app-title">Web Orin</h1>
        <li>
          <button className="menu-link"
            onClick={() => setActiveSection("about")}>
              当アプリについて
          </button>
        </li>
        <li>
          <button className="menu-link"
            onClick={() => setActiveSection("comment")}>
              コメント
          </button>
        </li>
      </ul>

      <div className="menu-content">
        {activeSection === "about" && (
          <div>
            <h3>WebOrinについて</h3>
            <p>
              WebOrinは、いつ、どこでもお鈴を鳴らせるWebアプリです。
            </p>
            <p>
              効果音：   
              <a
                href="https://otologic.jp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                OtoLogic
              </a>
                &nbsp; 様
            </p>

          </div>
        )}

        {activeSection === "comment" && (
          <div>
            <p>（ここにコメント機能予定）</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideMenu;