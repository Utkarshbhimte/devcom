import React, { useState, useRef } from "react";
import "./AddProjectCard.scss";
import { createWork, updateWork } from "util/db";
import { useAuth } from "util/auth";

export const ProjectFormModal = ({ defaultValue = {}, children, title }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState(defaultValue.tags || []);

  // inputRef
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectLinkRef = useRef(null);
  const codeLinkRef = useRef(null);

  const handleToggle = () => setShowForm((prev) => !prev);

  const handleTagsChange = (event) => {
    const value = event.target.value;
    setTags(
      value
        .split(",")
        .map((a) => a.trim())
        .filter((a) => !!a.length)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const title = titleRef.current && titleRef.current.value;
      const desc = descRef.current && descRef.current.value;
      const projectLink =
        projectLinkRef.current && projectLinkRef.current.value;
      const codeLink = codeLinkRef.current && codeLinkRef.current.value;
      setIsLoading(true);

      if (defaultValue.id) {
        await updateWork(defaultValue.id, {
          title,
          desc,
          projectLink,
          codeLink,
          tags,
        });
      } else {
        await createWork({
          title,
          desc,
          projectLink,
          codeLink,
          tags,
          owner: user.uid,
          type: "project",
        });
      }
      setShowForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!showForm && React.cloneElement(children, { onClick: handleToggle })}
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
            <h3 className="title is-4">{title}</h3>
            <div className="form-wrapper">
              <div className="control">
                <span>Project Name</span>
                <input
                  defaultValue={defaultValue.title}
                  ref={titleRef}
                  autoFocus
                  className="input"
                  type="text"
                />
              </div>
              <div className="control">
                <span>Tags</span>
                <div className="tags">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <input
                  className="input"
                  type="text"
                  defaultValue={(defaultValue.tags || []).join(",")}
                  placeholder="add relevant language and libraries; comma separated"
                  onChange={handleTagsChange}
                />
              </div>
              <div className="control">
                <span>Brief Description</span>
                <textarea
                  defaultValue={defaultValue.desc}
                  ref={descRef}
                  className="textarea"
                  placeholder="Keep it under 220 characters"
                ></textarea>
              </div>
              <div className="control">
                <span>Project URL </span>
                <input
                  defaultValue={defaultValue.projectLink || "https://"}
                  ref={projectLinkRef}
                  className="input"
                  type="text"
                  placeholder="https://"
                />
              </div>
              <div className="control">
                <span>Github URL (if public)</span>
                <input
                  defaultValue={defaultValue.codeLink}
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

const AddProjectCard = () => (
  <ProjectFormModal title="Add Project">
    <div className="add-project-card work-card">Add Project</div>
  </ProjectFormModal>
);

export default AddProjectCard;
