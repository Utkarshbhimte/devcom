import React from "react";
// import './DeveloperProjectCardComponent.scss';
import githubLogo from "../../assets/github.svg";

const DeveloperProjectCardComponent = ({ project }) => {
  let { title, desc, tags, projectLink, codeLink } = project;
  return (
    <div className="work-card p-4">
      <h3 className="text-xl mb-2">{title}</h3>
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

      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      {projectLink && (
        <a
          href={projectLink}
          className="mr-2 text-sm text-primary my-2 block"
          target="_blank"
        >
          {projectLink}
        </a>
      )}

      <div className="grid gap-2 mt-2 ">
        <a
          className="w-4 h-4"
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubLogo}></img>
        </a>
      </div>
    </div>
  );
};

export default DeveloperProjectCardComponent;
