import React from "react";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth.js";
import "components/DashboardPlaceholder.scss";
import AddProjectCard from "./AddProjectCard/AddProjectCard";
import AddBlogCard from "./AddBlogCard/AddBlogCard";
import { useProjectsByOwner, useBlogsByOwner } from "util/db";
import { BlogFormModal } from "./AddBlogCard/AddBlogCard";
import { ProjectFormModal } from "./AddProjectCard/AddProjectCard";

function DashboardPlaceholder(props) {
  const { user } = useAuth();
  const projectQuery = user && useProjectsByOwner(user.uid);
  const blogQuery = user && useBlogsByOwner(user.uid);
  return (
    <Section color={props.color} size={props.size} className="dashboard-page">
      <div className="container">
        <SectionHeader
          title={`Hey there, ${user.name} 👋`}
          // subtitle={`You are logged in as ${}`}
          size={3}
          spaced={true}
          className="has-text-centered"
        ></SectionHeader>

        <section className="py-4">
          <div className="container">
            <h3 className="section-heading title is-5">Your Projects</h3>
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
                    <div target="_blank" className="work-card ">
                      <div className="details">
                        <h4 className="title is-4 mb-1">{project.title}</h4>
                        <p>{project.desc}</p>
                      </div>
                    </div>
                  </ProjectFormModal>
                ))}
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container">
            <h3 className="section-heading title is-5">Your Blogs</h3>
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
          </div>
        </section>
      </div>
    </Section>
  );
}

export default DashboardPlaceholder;
