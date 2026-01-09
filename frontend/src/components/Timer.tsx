import { useEffect, useRef, useState } from "react";
import NoSleep from "nosleep.js";
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

  /* =========================
     NoSleep（1インスタンス）
     ========================= */
  const noSleepRef = useRef<NoSleep | null>(null);
  if (!noSleepRef.current) {
    noSleepRef.current = new NoSleep();
  }

  /* =========================
     Audio（iOS対策）
     - unlock用（無音）
     - 再生用（実音）
     ========================= */
  const unlockAudioRef = useRef<HTMLAudioElement | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  /** iOS Safari 用：ユーザー操作内で一度だけ“無音再生”して解錠 */
  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;

    if (!unlockAudioRef.current) {
      unlockAudioRef.current = new Audio("/orin-sound.mp3");
      unlockAudioRef.current.volume = 0; // ★ muted より安全
    }

    unlockAudioRef.current
      .play()
      .then(() => {
        unlockAudioRef.current?.pause();
        unlockAudioRef.current!.currentTime = 0;
        audioUnlockedRef.current = true;
      })
      .catch(() => {
        // 失敗してもOK（iOSでは起きうる）
      });
  };

  /** 実際に鳴らす（終了時のみ） */
  const playBell = () => {
    if (!bellAudioRef.current) {
      bellAudioRef.current = new Audio("/orin-sound.mp3");
    }
    bellAudioRef.current.currentTime = 0;
    bellAudioRef.current.play().catch(() => {});
  };

  /* =========================
     タイマー進行
     ========================= */
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

        // 🔔 終了時のみ鳴らす
        playBell();

        // 💤 スリープ解除
        noSleepRef.current?.disable();

        onFinish?.();
      } else {
        setRemaining(next);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [running, paused, minutes, onFinish]);

  /* =========================
     操作系
     ========================= */
  const start = () => {
    // ★ 必ずユーザー操作内で
    unlockAudio();

    setRemaining(minutes * 60);
    setRunning(true);
    setPaused(false);
    startTimeRef.current = Date.now();
    pausedAtRef.current = null;

    noSleepRef.current?.enable();
  };

  const pause = () => {
    if (!running) return;
    setPaused(true);
    pausedAtRef.current = Date.now();
    // NoSleep は維持（スリープさせない）
  };

  const resume = () => {
    if (!paused || !pausedAtRef.current || !startTimeRef.current) return;

    const pausedDuration = Date.now() - pausedAtRef.current;
    startTimeRef.current += pausedDuration;

    setPaused(false);
    pausedAtRef.current = null;

    noSleepRef.current?.enable();
  };

  const stop = () => {
    setRunning(false);
    setPaused(false);
    setRemaining(0);
    startTimeRef.current = null;
    pausedAtRef.current = null;

    noSleepRef.current?.disable();
  };

  /* =========================
     表示
     ========================= */
  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <h3>Timer</h3>

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
