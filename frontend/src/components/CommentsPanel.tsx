import { useEffect, useState } from "react";
import type { Comment } from "../types/comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentsPanel = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch(() => {
        setError("コメントの取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return (
    <div className="comments-panel">
      <h3>Comment</h3>

      <CommentForm
        onSuccess={addComment}
        onError={setError}
      />

      {error && <p className="comment-error">{error}</p>}

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default CommentsPanel;