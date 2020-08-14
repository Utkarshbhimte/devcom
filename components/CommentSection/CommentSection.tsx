import React, { useState, useRef } from "react";
// import "./CommentSection.scss";
import {
  useComments,
  useUser,
  firestore,
  updateComment,
  deleteComment,
} from "../../util/db";
import { formatFirebaseDate } from "../../util/date";
import { useAuth } from "../../util/auth";

const loadingState = {
  delete: "Delete",
  edit: "Edit",
  comment: "Comment",
};
const CommentCell = ({ comment }) => {
  const { user } = useAuth();
  const [authorData, authorDataLoading, authorDataError] = useUser(
    comment.owner
  );
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

  return (
    <div className="comment-row flex">
      {authorData ? (
        <img
          className="w-12 h-12 mr-4 rounded-full"
          src={authorData.photoURL}
          alt={authorData.displayName}
        />
      ) : (
        <div className="w-12 h-12 mr-4" />
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
        <div className="grid gap-2 grid-flow-col text-xs mt-2">
          {comment.created && (
            <span>{formatFirebaseDate(comment.created.seconds * 1000)}</span>
          )}
          {!!user && user.uid === authorData?.uid && (
            <>
              <a role="button" onClick={editComment}>
                Edit
              </a>
              <a
                className={`delete-btn ${
                  loading === loadingState.delete ? "is-loading" : ""
                }`}
                role="button"
                onClick={handleDeleteButtonClick}
              >
                Delete
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ workId }) => {
  const [data, loading, error] = useComments(workId);
  return (
    <div className="grid gap-4 my-8">
      {data?.map((comment) => (
        <CommentCell key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
