import { useState } from "react";
import type { Comment } from "../types/comment";
import "./CommentForm.css";

type Props = {
  onSuccess: (comment: Comment) => void;
  onError: (message: string) => void;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentForm = ({ onSuccess, onError }: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    onError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: { body: text },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        onError(data.errors?.join(", ") || "投稿に失敗しました");
        return;
      }

      onSuccess(data);
      setText("");
    } catch {
      onError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form">
      <textarea
        className="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ひとことコメント"
      />

      <button
        className="comment-submit"
        onClick={submit}
        disabled={loading}
      >
        送信
      </button>
    </div>
  );
};

export default CommentForm;
