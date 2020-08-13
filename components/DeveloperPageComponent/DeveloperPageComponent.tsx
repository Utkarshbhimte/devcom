import React from "react";
// import "./DeveloperPageComponent.scss";
import DeveloperBannerComponent from "../../components/DeveloperBanner/DeveloperBannerComponent";
import DeveloperProjectCardComponent from "../../components/DeveloperProjectCard/DeveloperProjectCardComponent";
import DeveloperBlogCardComponent from "../../components/DeveloperBlogCard/DeveloperBlogCardComponent";

const DeveloperPageComponent = ({ data }) => {
  const devBlogs = data.works?.filter((work) => work.type === "blog");
  const devProjects = data.works?.filter((work) => work.type === "project");
  return (
    <div>
      <section className="py-8">
        <div className="container mx-auto">
          <DeveloperBannerComponent data={data} />
        </div>
      </section>

      {!!devProjects?.length && (
        <section className="container mx-auto my-8">
          <h3 className="section-heading">Projects</h3>

          <div className="work-card-grid">
            {devProjects.map((work, index) => {
              return (
                <DeveloperProjectCardComponent key={index} project={work} />
              );
            })}
          </div>
        </section>
      )}

      {!!devBlogs?.length && (
        <section className="container mx-auto my-8">
          <h3 className="section-heading">Blogs</h3>

          <div className="work-card-grid">
            {devBlogs.map((work, index) => {
              return <DeveloperBlogCardComponent key={index} blog={work} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default DeveloperPageComponent;
