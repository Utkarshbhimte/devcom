import React from "react";
// import "./ExplainBanner.scss";
import { useAuth } from "../../util/auth";
const ExplainBanner = () => {
  const { user } = useAuth();
  return (
    !user && (
      <div className=" bg-primary text-white py-12">
        <div className="mx-auto container">
          <h2 className="text-2xl mb-2">Showcase and discuss your project</h2>
          <p>Get feedback from other developers and improve your projects</p>
        </div>
      </div>
    )
  );
};

export default ExplainBanner;
