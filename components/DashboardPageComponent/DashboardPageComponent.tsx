import React from "react";
import { useAuth } from "../../util/auth";
// import "components/DashboardPageComponent.scss";
import AddProjectCard from "../AddProjectCard/AddProjectCard";
import AddBlogCard from "../AddBlogCard/AddBlogCard";
import { useProjectsByOwner, useBlogsByOwner } from "../../util/db";
import { BlogFormModal } from "../AddBlogCard/AddBlogCard";
import { ProjectFormModal } from "../AddProjectCard/AddProjectCard";

function DashboardPageComponent(props) {
  const { user } = useAuth();
  const projectQuery = user && useProjectsByOwner(user.uid);
  const blogQuery = user && useBlogsByOwner(user.uid);
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
            <h3 className="text-sm tracking-wide text-gray-700 mb-2 uppercase">
              Your Projects
            </h3>
            <div className="work-card-grid">
              <AddProjectCard />
              {projectQuery &&
                projectQuery.data &&
                projectQuery.data.map((project) => (
                  <ProjectFormModal
                    key={project.id}
                    defaultValue={project}
                    title="Edit Project"
                  >
                    <div className="work-card ">
                      <div className="details">
                        <h4 className="title is-4 mb-1">{project.title}</h4>
                        <p>{project.desc}</p>
                      </div>
                    </div>
                  </ProjectFormModal>
                ))}
            </div>
          </section>
          <section className="my-12">
            <h3 className="text-sm tracking-wide text-gray-700 mb-2 uppercase">
              Your Blogs
            </h3>
            <div className="work-card-grid">
              <AddBlogCard />
              {blogQuery &&
                blogQuery.data &&
                blogQuery.data.map((blog) => (
                  <BlogFormModal
                    key={blog.id}
                    defaultValue={blog}
                    title="Edit Blog"
                  >
                    <div className="work-card ">
                      <div className="details">
                        <h4 className="title is-4 mb-1">{blog.title}</h4>
                        <p>{blog.desc}</p>
                      </div>
                    </div>
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
