import React, { useRef, useState } from "react";
import "./WorkPage.scss";
import CommentSection from "components/CommentSection/CommentSection";
import { CommentInput } from "./CommentInput";
import { formatDate } from "util/date";

const WorkPageComponent = ({ data }) => {
  console.log("WorkPageComponent -> data", data);

  return (
    <div className="work-page-container">
      <div className="page-header">
        <div className="container">
          <h3 className="title is-3">{data.title}</h3>
          <p className="project-desc">{data.desc}</p>
          <div className="media owner-details">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={data.ownerData.photoURL}
                  alt={data.ownerData.displayName}
                />
              </figure>
            </div>
            <div className="media-content">
              <p>{data.ownerData.displayName}</p>
              <span>{formatDate(data.created._seconds * 1000)}</span>
            </div>
          </div>

          <div className="buttons">
            {data.blogLink && data.blogLink.length && (
              <a
                href={data.blogLink}
                target="_blank"
                className="button is-primary"
              >
                Read it
              </a>
            )}
            {data.codeLink && data.codeLink.length && (
              <a href={data.codeLink} target="_blank" className="button">
                Code
              </a>
            )}
            {data.projectLink && data.projectLink.length && (
              <a
                href={data.projectLink}
                target="_blank"
                className="button is-primary"
              >
                Checkout the App
              </a>
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
