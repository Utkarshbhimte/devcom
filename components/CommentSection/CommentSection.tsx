import React, { useState, useRef } from "react";
// import "./CommentSection.scss";
import {
  useComments,
  useUser,
  firestore,
  updateComment,
  deleteComment,
} from "../../util/db";
import { formatDate } from "../../util/date";
import { useAuth } from "../../util/auth";

const loadingState = {
  delete: "Delete",
  edit: "Edit",
  comment: "Comment",
};
const CommentCell = ({ comment }) => {
  const { user } = useAuth();
  const { data: authorData } = useUser(comment.owner);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const editComment = () => setEditMode(true);
  const handleDeleteButtonClick = async () => {
    if (!!loading) {
      return;
    }

    setLoading(loadingState.delete);

    try {
      await deleteComment({ workId: comment.workId, commentId: comment.id });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleSubmit = async (event?: any) => {
    event && event.preventDefault();
    const text = inputRef.current && inputRef.current.value;

    if (!(text && !!text.length)) {
      handleDeleteButtonClick();
      return;
    }
    inputRef.current.value = "";

    try {
      setLoading(loadingState.edit);
      setEditMode(false);
      await updateComment({
        workId: comment.workId,
        text,
        commentId: comment.id,
      });
    } catch (error) {
      setEditMode(true);
      console.error(error);
      inputRef.current.value = text;
    } finally {
      setLoading(null);
    }
  };

  const handleEnterPressOnInput = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  console.log(
    "CommentCell -> user.uid === authorData.uid",
    user.uid === authorData.uid
  );
  return (
    <div className="comment-row">
      {authorData ? (
        <img src={authorData.photoURL} alt={authorData.displayName} />
      ) : (
        <div />
      )}
      <div>
        {authorData && (
          <div className="comment-header">
            <strong>{authorData.displayName}</strong>
          </div>
        )}
        {!editMode && <p className="comment-content">{comment.text}</p>}
        {!!editMode && (
          <form className="edit-input-wrapper" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              defaultValue={comment.text}
              onKeyDown={handleEnterPressOnInput}
              className={`textarea comment-input`}
              placeholder="Share your thoughts on this project"
            ></textarea>
            <button
              type="submit"
              className={`button primary-action ${
                loading === loadingState.edit ? "is-loading" : ""
              }`}
            >
              Update
            </button>
          </form>
        )}
        <div className="comment-footer">
          {!!user && user.uid === authorData.uid && (
            <span className="comment-actions">
              <a
                className=" comment-action-btn button is-white"
                role="button"
                onClick={editComment}
              >
                Edit
              </a>
              <a
                className={`delete-btn comment-action-btn button is-white ${
                  loading === loadingState.delete ? "is-loading" : ""
                }`}
                role="button"
                onClick={handleDeleteButtonClick}
              >
                Delete
              </a>
            </span>
          )}
          {comment.created && (
            <small className="timestamp">
              {formatDate(comment.created.seconds * 1000)}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ workId }) => {
  const { data } = useComments(workId);
  console.log("CommentSection -> data", data);
  return (
    <div className="comment-section">
      {data &&
        data.map((comment) => (
          <CommentCell key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default CommentSection;
