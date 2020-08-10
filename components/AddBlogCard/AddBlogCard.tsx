import React, { useState, useRef } from "react";
// import "./AddBlogCard.scss";
import { useAuth } from "../../util/auth";
import { createWork, updateWork, deleteWork } from "../../util/db";
import { Work } from "../../util/contracts";

interface BlogFormModalProps {
  defaultValue?: Work;
  title: string;
}
export const BlogFormModal: React.FC<BlogFormModalProps> = ({
  defaultValue,
  children,
  title,
}) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>(defaultValue?.tags || []);

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
      if (defaultValue?.id) {
        await updateWork(defaultValue?.id, {
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
      {!showForm &&
        React.isValidElement(children) &&
        React.cloneElement(children, { onClick: handleToggle })}
      {!!showForm && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="form-wrapper">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Blog URL{" "}
                  </label>
                  <input
                    ref={blogLinkRef}
                    autoFocus
                    defaultValue={defaultValue?.link}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="https://"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    ref={titleRef}
                    defaultValue={defaultValue?.title}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      isFetchingData ? "is-loading" : ""
                    }`}
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tags
                  </label>
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
                    defaultValue={(defaultValue?.tags || []).join(",")}
                    placeholder="add relevant language and libraries; comma separated"
                    onChange={handleTagsChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Brief Description
                  </label>
                  <textarea
                    ref={descRef}
                    defaultValue={defaultValue?.description}
                    className={`textarea ${isFetchingData ? "is-loading" : ""}`}
                    placeholder="Keep it under 220 characters"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-between bg-gray-50 px-4 py-3 sm:px-6">
              <div>
                {defaultValue?.id && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex justify-center w-full rounded-md text-red-400 border border-transparent px-4 py-2 text-base leading-6 font-medium  shadow-sm hover:text-red-300 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Add Blog
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    onClick={handleToggle}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {!!showForm && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <h3 className="title is-4">{title}</h3>
            <div className="form-wrapper">
              <div className="control">
                <span>Blog URL </span>
                <input
                  ref={blogLinkRef}
                  defaultValue={defaultValue?.blogLink}
                  className="input"
                  type="text"
                  placeholder="https://"
                />
              </div>
              <div className="control">
                <span>Title</span>
                <input
                  ref={titleRef}
                  defaultValue={defaultValue?.title}
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
                  defaultValue={defaultValue?.desc}
                  className={`textarea ${isFetchingData ? "is-loading" : ""}`}
                  placeholder="Keep it under 220 characters"
                ></textarea>
              </div>
            </div>
            <div className="buttons">
              {defaultValue.id && (
                <div onClick={handleDelete} className="button is-danger">
                  Delete
                </div>
              )}
              <div onClick={handleToggle} className="button">
                Cancel
              </div>
              <div
                onClick={handleSubmit}
                className={`button is-primary ${isLoading ? "is-loading" : ""}`}
              >
                Add Blog
              </div>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )} */}
    </>
  );
};

const AddBlogCard = () => (
  <BlogFormModal title="Add Blog">
    <div className="add-blog-card work-card">Add Blog</div>
  </BlogFormModal>
);

export default AddBlogCard;
