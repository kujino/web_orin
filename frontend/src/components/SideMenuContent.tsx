import CommentsPanel from "./CommentsPanel";
import BellCountPanel from "./BellCountPanel.tsx";
import Timer from "./Timer.tsx";


type Props = {
  activeSection: "about" | "comment" | "timer" | null;
  bellCount: number | null;
  onTimerFinish: () => void;
};

const SideMenuContent = ({ activeSection, bellCount,onTimerFinish }: Props) => {

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

  if (activeSection === "comment") {
    return <CommentsPanel />;
  }

if (activeSection === "timer") {
  return <Timer onFinish={onTimerFinish} />;
}


  return <BellCountPanel count={bellCount} />;
};

export default SideMenuContent;
