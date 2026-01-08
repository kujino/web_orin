import { useEffect, useRef, useState } from "react";

type TimerProps = {
  onFinish?: () => void;
};

const Timer = ({ onFinish }: TimerProps) => {
  const [minutes, setMinutes] = useState(5);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    startTimeRef.current = Date.now();

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
        onFinish?.();
      } else {
        setRemaining(next);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [running, minutes, onFinish]);

  const start = () => {
    setRemaining(minutes * 60);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setRemaining(0);
    startTimeRef.current = null;
  };

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Timer</h2>

      {!running && (
        <input
          type="number"
          min={1}
          max={60}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      )}

      <div>{format(remaining)}</div>

      {!running ? (
        <button onClick={start}>Start</button>
      ) : (
        <button onClick={stop}>Stop</button>
      )}
    </div>
  );
};

export default Timer;
