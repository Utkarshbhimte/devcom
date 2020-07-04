import React, { useRef, useState } from "react";
import "./WorkPage.scss";
import CommentSection from "components/CommentSection/CommentSection";
import { CommentInput } from "./CommentInput";

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
