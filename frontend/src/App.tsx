import React, { useEffect,useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"about" | "comment" | null>(null);

  const [bellCount, setBellCount] = useState<number | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bell_rings`)
      .then((res) => res.json())
      .then((data) => setBellCount(data.count))
      .catch(() => setBellCount(null));
  }, []);

  const playSound = () => {
    const audio = new Audio("/orin-sound.mp3");
    audio.currentTime = 0;
    audio.play();
  };

  const ringBell = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bell_rings`, {
        method: "POST",
      });

      if (!res.ok) throw new Error();

      setBellCount((prev) => (prev ?? 0) + 1);
    } catch {
      console.error("bell ring failed");
    }
  };

  useEffect(() => {
    if (!menuOpen) {
      setActiveSection(null);
    }
  }, [menuOpen]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <SideMenu
        open={menuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        bellCount={bellCount}
      />

      <main className="container">
        <img
          src="/orin02.png"
          alt="お鈴（PC）"
          className="orin pc-only"
        />
        <img
          src="/orin-sp.png"
          alt="お鈴（スマホ）"
          className="orin sp-only"
        />
        <button
          onClick={async () => {
            playSound();
            await ringBell();
          }}
          className="ring-button"
        >
          <img
            src="/bell-button02.png"
            alt="bell_button"
            className="bell_button"
          />
        </button>
      </main>
    </>
  );
}

export default App;
