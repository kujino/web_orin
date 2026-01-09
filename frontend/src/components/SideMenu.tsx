import "./SideMenu.css";
import SideMenuContent from "./SideMenuContent";

type Props = {
  open: boolean;
  activeSection: "about" | "comment" | "timer" | null;
  setActiveSection: React.Dispatch<
    React.SetStateAction<"about" | "comment" | "timer" | null>
  >;
  bellCount: number | null;
};

const SideMenu =  ({
  open,
  activeSection,
  setActiveSection,
  bellCount,
}: Props) => {
  if (!open) return null;

  const playSound = () => {
    const audio = new Audio("/orin-sound.mp3");
    audio.play();
  };

  const handleToggle = (section: "about" | "comment" | "timer") => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const shareText = encodeURIComponent(
    "Web Orin｜ワンタップでお鈴を鳴らせるWebアプリ"
  );
  const shareUrl = encodeURIComponent("https://web-orin.vercel.app");
  const hashtags = encodeURIComponent("webでチーン");

  const xShareUrl =
    `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=${hashtags}`;

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
            onClick={() => handleToggle("timer")}
          >
            <span className="menu-text">タイマー（試験中）</span>

            {activeSection === "timer" && (
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

        <li className="share-item">
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="x-share-button"
          >
            <span className="x-icon">𝕏</span>
            <span className="x-text">でシェア</span>
          </a>
        </li>
      </ul>

      <div className="menu-content">
        <SideMenuContent
          activeSection={activeSection}
          bellCount={bellCount}
          onTimerFinish={playSound}
        />
      </div>
    </aside>
  );
};

export default SideMenu;
