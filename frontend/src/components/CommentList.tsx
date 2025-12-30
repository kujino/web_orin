import type { Comment } from "../types/comment";
import "./CommentList.css";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  if (comments.length === 0) {
    return <p className="comment-empty">まだコメントはありません</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment-item">
          {c.body}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
