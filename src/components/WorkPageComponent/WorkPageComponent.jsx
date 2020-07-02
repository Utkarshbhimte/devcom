import React, { useRef, useState } from "react";
import "./WorkPage.scss";
import { useAuth } from "util/auth";
import { createComment } from "util/db";
import CommentSection from "components/CommentSection/CommentSection";

const CommentInput = ({ workId }) => {
  const { user } = useAuth();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  return user ? (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      {user && (
        <img className="avatar" src={user.photoURL} alt="Placeholder image" />
      )}
      <textarea
        ref={inputRef}
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

const WorkPageComponent = ({ data }) => {
  return (
    <div className="work-page-container">
      <div className="page-header">
        <div className="container">
          <h3 className="title is-3">{data.title}</h3>
          <p className="project-desc">{data.desc}</p>
          <div className="buttons">
            {data.blogLink && <button className="button">Read it</button>}
            {data.codeLink && <button className="button">Code</button>}
            {data.projectLink && (
              <button className="button is-primary">Checkout the App</button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="discussion-wrapper">
          <h5 className="title is-5">Discussion</h5>
          <CommentInput workId={data.id} />
          <CommentSection workId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default WorkPageComponent;
