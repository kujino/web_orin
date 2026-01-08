import { useEffect, useRef, useState } from "react";

type TimerProps = {
  onFinish?: () => void;
};

const Timer = ({ onFinish }: TimerProps) => {

  const [minutes, setMinutes] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || paused) return;

    const id = setInterval(() => {
      if (!startTimeRef.current) return;

      const elapsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );

      const next = minutes * 60 - elapsed;

      if (next <= 0) {
        clearInterval(id);
        setRemaining(0);
        setRunning(false);
        setPaused(false);
        startTimeRef.current = null;
        pausedAtRef.current = null;
        onFinish?.();
      } else {
        setRemaining(next);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [running, paused, minutes, onFinish]);

  const start = () => {
    setRemaining(minutes * 60);
    setRunning(true);
    setPaused(false);
    startTimeRef.current = Date.now();
    pausedAtRef.current = null;
  };

  const pause = () => {
    if (!running) return;
    setPaused(true);
    pausedAtRef.current = Date.now();
  };

  const resume = () => {
    if (!paused || !pausedAtRef.current || !startTimeRef.current) return;

    const pausedDuration = Date.now() - pausedAtRef.current;
    startTimeRef.current += pausedDuration;

    setPaused(false);
    pausedAtRef.current = null;
  };

  const stop = () => {
    setRunning(false);
    setPaused(false);
    setRemaining(0);
    startTimeRef.current = null;
    pausedAtRef.current = null;
  };

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Timer</h2>

      <label style={{ display: "block", marginBottom: "4px" }}>
        時間：<strong>{minutes} 分</strong>
      </label>

      <input
        type="range"
        min={1}
        max={60}
        step={1}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        disabled={running && !paused}
        style={{ width: "100%", marginBottom: "12px" }}
      />

      <div style={{ fontSize: "24px", marginBottom: "12px" }}>
        {running ? format(remaining) : format(minutes * 60)}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {!running && <button onClick={start}>開始</button>}
        {running && !paused && <button onClick={pause}>一時停止</button>}
        {running && paused && <button onClick={resume}>再開</button>}
        {running && <button onClick={stop}>終了</button>}
      </div>
    </div>
  );
};

export default Timer;
