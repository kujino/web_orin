import { useEffect, useRef, useState } from "react";
import "./Timer.css";

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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;

    if (!audioRef.current) {
      audioRef.current = new Audio("/orin-sound.mp3");
    }

    audioRef.current.muted = true;

    audioRef.current
      .play()
      .then(() => {
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.muted = false;
        }
        audioUnlockedRef.current = true;
      })
      .catch(() => {
      });
  };

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

        audioRef.current?.play();

        onFinish?.();
      } else {
        setRemaining(next);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [running, paused, minutes, onFinish]);

  const start = () => {
    unlockAudio();

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
    <div className="timer">
      <h3>Timer</h3>

      <p>
        ※ タイマー使用中はスリープ対策が必要です
      </p>

      <label className="timer-label">
        設定時間：<strong>{minutes} 分</strong>
      </label>

      <div className="timer-select-wrapper">
        <select
          className="timer-select"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={running && !paused}
        >
          {Array.from({ length: 60 }, (_, i) => i + 1).map((min) => (
            <option key={min} value={min}>
              {min}
            </option>
          ))}
        </select>
      </div>

      <div className="timer-remaining">
        {running ? format(remaining) : format(minutes * 60)}
      </div>

      <div className="timer-buttons">
        {!running && (
          <button className="timer-button" onClick={start}>
            開始
          </button>
        )}
        {running && !paused && (
          <button className="timer-button" onClick={pause}>
            一時停止
          </button>
        )}
        {running && paused && (
          <button className="timer-button" onClick={resume}>
            再開
          </button>
        )}
        {running && (
          <button className="timer-button" onClick={stop}>
            終了
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
