import React from "react";
import "components/PageLoader.scss";

function PageLoader(props) {
  return (
    <div className="PageLoader">
      <div className="loader is-loading"></div>
    </div>
  );
}

export default PageLoader;
