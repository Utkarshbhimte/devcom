import React, { useState, useRef } from "react";
import "./AddBlogCard.scss";
import { useAuth } from "util/auth";
import { createWork, updateWork, deleteWork } from "util/db";

export const BlogFormModal = ({ defaultValue = {}, children, title }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [tags, setTags] = useState(defaultValue.tags || []);

  // inputRef
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const blogLinkRef = useRef(null);

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

  const handleDelete = () => {
    setShowForm(false);
    deleteWork({ workId: defaultValue.id });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const title = titleRef.current && titleRef.current.value;
      const desc = descRef.current && descRef.current.value;
      const blogLink = blogLinkRef.current && blogLinkRef.current.value;

      setIsLoading(true);
      if (defaultValue.id) {
        await updateWork(defaultValue.id, {
          title,
          desc,
          blogLink,
          tags,
        });
      } else {
        await createWork({
          title,
          desc,
          blogLink,
          tags,
          owner: user.uid,
          type: "blog",
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
      <div className="Blog-form-card"></div>
    </>
  )} */}
      {!!showForm && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <h3 className="title is-4">{title}</h3>
            <div className="form-wrapper">
              <div className="control">
                <span>Blog URL </span>
                <input
                  ref={blogLinkRef}
                  defaultValue={defaultValue.blogLink}
                  className="input"
                  type="text"
                  placeholder="https://"
                />
              </div>
              <div className="control">
                <span>Title</span>
                <input
                  ref={titleRef}
                  defaultValue={defaultValue.title}
                  autoFocus
                  className={`input ${isFetchingData ? "is-loading" : ""}`}
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
                  ref={descRef}
                  defaultValue={defaultValue.desc}
                  className={`textarea ${isFetchingData ? "is-loading" : ""}`}
                  placeholder="Keep it under 220 characters"
                ></textarea>
              </div>
            </div>
            <div className="buttons">
              <div className="delete-button">
                {defaultValue.id && (
                  <div onClick={handleDelete} className="button is-danger">
                    Delete
                  </div>
                )}
              </div>
              <div className="action-button">
                <div onClick={handleToggle} className="button">
                  Cancel
                </div>
                <div
                  onClick={handleSubmit}
                  className={`button is-primary ${
                    isLoading ? "is-loading" : ""
                  }`}
                >
                  Add Blog
                </div>
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

const AddBlogCard = () => (
  <BlogFormModal title="Add Blog">
    <div className="add-blog-card work-card">Add Blog</div>
  </BlogFormModal>
);

export default AddBlogCard;
