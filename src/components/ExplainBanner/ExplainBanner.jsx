import React from "react";
import "./ExplainBanner.scss";
import { useAuth } from "util/auth";
const ExplainBanner = () => {
  const { user } = useAuth();
  return (
    !user && (
      <div className="explain-banner-wrap">
        <div className="container">
          <h2 className="title is-3">Showcase and discuss your project</h2>
          <p>Get feedback from other developers and improve your projects</p>
        </div>
      </div>
    )
  );
};

export default ExplainBanner;
