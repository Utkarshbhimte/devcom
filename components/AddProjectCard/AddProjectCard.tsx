import React, { useState, useRef } from "react";
// import "./AddProjectCard.scss";
import { createWork, updateWork, deleteWork } from "../../util/db";
import { useAuth } from "../../util/auth";
import { Work } from "../../util/contracts";

interface ProjectFormModalProps {
  defaultValue?: Partial<Work>;
  title: string;
}
export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  defaultValue = {},
  children,
  title,
}) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState(defaultValue?.tags || []);

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

  const handleDelete = () => {
    setShowForm(false);
    deleteWork({ workId: defaultValue });
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
        const updatedWork = {
          title,
          desc,
          projectLink,
          codeLink,
          tags,
        };
        await updateWork(defaultValue.id, updatedWork);
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
      {!showForm &&
        React.isValidElement(children) &&
        React.cloneElement(children, { onClick: handleToggle })}
      {!!showForm && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75">
              {title}
            </div>
          </div>
          <form
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            onSubmit={handleSubmit}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="form-wrapper">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Project URL
                  </label>
                  <input
                    autoFocus
                    name="projectLink"
                    ref={projectLinkRef}
                    defaultValue={defaultValue?.projectLink}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="https://"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Repo URL
                  </label>
                  <input
                    autoFocus
                    name="codeLink"
                    ref={codeLinkRef}
                    defaultValue={defaultValue?.codeLink}
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
                    name="title"
                    defaultValue={defaultValue?.title}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tags
                  </label>
                  <div className="mt-2 mb-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-primary text-xs cursor-pointer border border-primary rounded inline-block mr-2 px-2"
                      >
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
                    name="desc"
                    defaultValue={defaultValue?.desc}
                    className={`textarea`}
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
                    onClick={handleDelete}
                    className="inline-flex justify-center w-full rounded-md text-red-400 border border-transparent px-4 py-2 text-base leading-6 font-medium  shadow-sm hover:text-red-300 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="sm:flex sm:flex-row-reverse">
                {isLoading && (
                  <span className="text-primary py-2 px-4">Loading</span>
                )}
                {!isLoading && (
                  <>
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {defaultValue.id ? "Edit Project" : "Add Project"}
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
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const AddProjectCard = () => (
  <ProjectFormModal title="Add Project">
    <div className="add-project-card work-card h-100 flex items-center justify-center">
      Add Project
    </div>
  </ProjectFormModal>
);

export default AddProjectCard;
