import React, { useRef, useState } from "react";
import { useAuth } from "util/auth";
import { createComment } from "util/db";

export const CommentInput = ({ workId }) => {
  const { user } = useAuth();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event && event.preventDefault();
    const text = inputRef.current && inputRef.current.value;

    if (!(text && !!text.length)) {
      return;
    }
    inputRef.current.value = "";

    try {
      setLoading(true);
      await createComment(workId, text, user.uid);
    } catch (error) {
      console.error(error);
      inputRef.current.value = text;
    } finally {
      setLoading(false);
    }
  };

  const handleEnterPressOnInput = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return user ? (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      {user && (
        <img className="avatar" src={user.photoURL} alt="Placeholder image" />
      )}
      <textarea
        ref={inputRef}
        onKeyDown={handleEnterPressOnInput}
        className={`textarea comment-input`}
        placeholder="Share your thoughts on this project"
      ></textarea>
      <button
        className="primary-action"
        type="submit"
        className={`button is-primary ${loading ? "is-loading" : ""}`}
      >
        Send
      </button>
    </form>
  ) : (
    <div className="primary-action">Login now to join the discussion</div>
  );
};
