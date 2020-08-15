import React from "react";
import { useAuth } from "../../util/auth";
// import "components/DashboardPageComponent.scss";
import AddProjectCard from "../AddProjectCard/AddProjectCard";
import AddBlogCard from "../AddBlogCard/AddBlogCard";
import { useProjectsByOwner, useBlogsByOwner } from "../../util/db";
import { BlogFormModal } from "../AddBlogCard/AddBlogCard";
import { ProjectFormModal } from "../AddProjectCard/AddProjectCard";
import { Work } from "../../util/contracts";
import DeveloperProjectCard from "../DeveloperProjectCard/DeveloperProjectCardComponent";
import DeveloperBlogCardComponent from "../DeveloperBlogCard/DeveloperBlogCardComponent";

function DashboardPageComponent(props) {
  const { user } = useAuth();
  const [projectQuery] = user && useProjectsByOwner(user.uid);
  const [blogQuery] = useBlogsByOwner(user.uid);
  return (
    <div color={props.color} className="dashboard-page">
      <div className="py-12 border-b border-t">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl">Hey there, {user?.displayName} 👋</h1>
        </div>
      </div>

      <div className="py-2">
        <div className="container mx-auto">
          <section className="my-12">
            <h3 className="section-heading">Your Projects</h3>
            <div className="work-card-grid">
              <AddProjectCard />
              {projectQuery?.map((project) => (
                <ProjectFormModal
                  key={project.id}
                  defaultValue={project}
                  title="Edit Project"
                >
                  <DeveloperProjectCard project={project} />
                </ProjectFormModal>
              ))}
            </div>
          </section>
          <section className="my-12">
            <h3 className="section-heading">Your Blogs</h3>
            <div className="work-card-grid">
              <AddBlogCard />
              {blogQuery?.map((blog) => (
                <BlogFormModal
                  key={blog.id}
                  defaultValue={blog}
                  title="Edit Blog"
                >
                  <DeveloperBlogCardComponent blog={blog} />
                </BlogFormModal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPageComponent;
