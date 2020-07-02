import React from "react";
import "./CommentSection.scss";
import { useComments, useUser } from "util/db";
import { formatDate } from "util/date";

const CommentCell = ({ comment }) => {
  const { data: authorData } = useUser(comment.author);
  console.log("CommentCell -> authorData", authorData);

  return (
    <div className="comment-row">
      {authorData ? (
        <img src={authorData.photoURL} alt={authorData.displayName} />
      ) : (
        <div />
      )}
      <div>
        {authorData && (
          <div>
            <strong>{authorData.displayName}</strong> |{" "}
            {comment.created && (
              <small>{formatDate(comment.created.seconds * 1000)}</small>
            )}
          </div>
        )}
        <p className="comment-content">{comment.text}</p>
      </div>
    </div>
  );
};

const CommentSection = ({ workId }) => {
  const { data } = useComments(workId);
  return (
    <div className="comment-section">
      {data && data.map((comment) => <CommentCell comment={comment} />)}
    </div>
  );
};

export default CommentSection;
