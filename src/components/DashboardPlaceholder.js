import React from "react";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth.js";
import "components/DashboardPlaceholder.scss";
import AddProjectCard from "./AddProjectCard/AddProjectCard";
import AddBlogCard from "./AddBlogCard/AddBlogCard";
import { useProjectsByOwner } from "util/db";

function DashboardPlaceholder(props) {
  const { user } = useAuth();
  const projectQuery = user && useProjectsByOwner(user.uid);
  console.log("DashboardPlaceholder -> projectQuery", projectQuery);
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
            <h3 className="section-heading title is-3 ">Your Projects</h3>
            <div className="work-card-grid">
              <AddProjectCard />
              {projectQuery &&
                projectQuery.data &&
                projectQuery.data.map((project) => (
                  <div key={project.id} target="_blank" className="work-card ">
                    <div className="details">
                      <h4 className="title is-4 mb-1">{project.title}</h4>
                      <p>{project.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container">
            <h3 className="section-heading title is-3">Your Blogs</h3>
            <div className="work-card-grid">
              <AddBlogCard />
              {props.userData &&
                (props.userData.blogs || []).map((blog) => (
                  <div className="blog-card">Here is a Blog</div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </Section>
  );
}

export default DashboardPlaceholder;
