import React from "react";
// import "./DeveloperPageComponent.scss";
import DeveloperBannerComponent from "../../components/DeveloperBanner/DeveloperBannerComponent";
import DeveloperProjectCardComponent from "../../components/DeveloperProjectCard/DeveloperProjectCardComponent";
import DeveloperBlogCardComponent from "../../components/DeveloperBlogCard/DeveloperBlogCardComponent";

const DeveloperPageComponent = ({ data }) => {
  return (
    <div className="dev-page-container">
      <section className="section page-header">
        <div className="container">
          <DeveloperBannerComponent data={data} />
        </div>
      </section>

      <section className="section page-projects">
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <h1 className="title">Projects</h1>
            </div>
          </div>

          <div className="work-card-grid">
            {data.works
              ?.filter((work) => work.type === "project")
              .map((work, index) => {
                return (
                  <DeveloperProjectCardComponent key={index} project={work} />
                );
              })}
          </div>
        </div>
      </section>

      <section className="section page-projects">
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <h1 className="title">Blogs</h1>
            </div>
          </div>

          <div className="work-card-grid">
            {data.works
              ?.filter((work) => work.type === "blog")
              .map((work, index) => {
                return <DeveloperBlogCardComponent key={index} blog={work} />;
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperPageComponent;
