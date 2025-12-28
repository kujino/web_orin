import React from 'react';
import Header from './components/Header';

function App() {
  const playSound = () => {
    const audio = new Audio("/orin-sound.mp3");
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <>
      <Header />
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
          onClick={playSound}
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
