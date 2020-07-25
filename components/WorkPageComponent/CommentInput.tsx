import React, { useRef, useState } from "react";
import { useAuth } from "../../util/auth";
import { createComment } from "../../util/db";

export const CommentInput = ({ workId }) => {
  const { user } = useAuth();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event && event.preventDefault();
    const text = inputRef.current?.value;

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
    <form className="flex" onSubmit={handleSubmit}>
      {user && (
        <figure className="h-12 w-12 mr-4">
          <img
            className="rounded-full"
            src={user?.photoURL}
            alt={user?.displayName}
          />
        </figure>
      )}
      <textarea
        ref={inputRef}
        onKeyDown={handleEnterPressOnInput}
        className={`textarea comment-input mr-4`}
        placeholder="Share your thoughts on this project"
      ></textarea>
      <button
        type="submit"
        className={`button primary-action is-primary ${
          loading ? "is-loading" : ""
        }`}
      >
        Send
      </button>
    </form>
  ) : (
    <div className="primary-action">Login now to join the discussion</div>
  );
};
