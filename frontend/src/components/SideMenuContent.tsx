import CommentsPanel from "./CommentsPanel";
import BellCountPanel from "./BellCountPanel.tsx";


type Props = {
  activeSection: "about" | "comment" | null;
  bellCount: number | null;
};

const SideMenuContent = ({ activeSection, bellCount }: Props) => {
  if (activeSection === "comment") {
    return <CommentsPanel />;
  }

  if (activeSection === "about") {
    return (
      <div>
        <h3>About</h3>
        <p>Web Orinは、いつ、どこでもお鈴を鳴らせるWebアプリです。</p>
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
    );
  }

  return <BellCountPanel count={bellCount} />;
};

export default SideMenuContent;
