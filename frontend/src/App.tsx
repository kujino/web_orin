import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
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
    </div>
  );
}

export default App;
