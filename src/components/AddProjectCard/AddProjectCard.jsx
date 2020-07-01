import React, { useState, useRef } from "react";
import "./AddProjectCard.scss";
import { createWork } from "util/db";
import { useAuth } from "util/auth";

const AddProjectCard = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // inputRef
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectLinkRef = useRef(null);
  const codeLinkRef = useRef(null);

  const handleToggle = () => setShowForm((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const title = titleRef.current && titleRef.current.value;
      const desc = descRef.current && descRef.current.value;
      const projectLink =
        projectLinkRef.current && projectLinkRef.current.value;
      const codeLink = codeLinkRef.current && codeLinkRef.current.value;
      setIsLoading(true);
      await createWork({
        title,
        desc,
        projectLink,
        codeLink,
        owner: user.id,
        type: "project",
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!showForm && (
        <div onClick={handleToggle} className="add-project-card work-card">
          Add Project
        </div>
      )}
      {/*
      {!!showForm && (
        <>
          <div className="overlay" />
          <div className="project-form-card"></div>
        </>
      )} */}
      {!!showForm && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <h3 className="title is-4">Add Project</h3>
            <div className="form-wrapper">
              <div className="control">
                <span>Project Name</span>
                <input ref={titleRef} autoFocus className="input" type="text" />
              </div>
              <div className="control">
                <span>Brief Description</span>
                <textarea
                  ref={descRef}
                  className="textarea"
                  placeholder="Keep it under 220 characters"
                ></textarea>
              </div>
              <div className="control">
                <span>Project URL </span>
                <input
                  ref={projectLinkRef}
                  className="input"
                  type="text"
                  placeholder="https://"
                />
              </div>
              <div className="control">
                <span>Github URL (if public)</span>
                <input
                  ref={codeLinkRef}
                  className="input"
                  type="text"
                  placeholder="https://github.com/**********"
                />
              </div>
            </div>
            <div className="buttons">
              <div onClick={handleToggle} className="button">
                Cancel
              </div>
              <div
                onClick={handleSubmit}
                className={`button is-primary ${isLoading ? "is-loading" : ""}`}
              >
                Add Project
              </div>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )}
    </>
  );
};

export default AddProjectCard;
