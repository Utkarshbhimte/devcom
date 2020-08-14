import React from "react";
// import './DeveloperBlogCardComponent.scss';
import externalLinkLogo from "../../assets/external-link.svg";

const DeveloperBlogCardComponent = ({ blog }) => {
  let { title, desc, tags, blogLink } = blog;
  return (
    <div className="work-card p-4">
      <h4 className="text-xl mb-2">{title}</h4>
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

      <a
        className="popout-icon"
        href={blogLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style={{ height: "1.3rem" }} src={externalLinkLogo}></img>
      </a>
    </div>
  );
};
export default DeveloperBlogCardComponent;
