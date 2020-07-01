import React from "react";
import "./CommentSection.scss";
import { useComments } from "util/db";

const CommentSection = ({ workId }) => {
  const query = useComments(workId);
  return (
    <div className="comment-section">
      {query.data &&
        query.data.map((comment) => (
          <div className="comment-row">{comment.text}</div>
        ))}
    </div>
  );
};

export default CommentSection;
