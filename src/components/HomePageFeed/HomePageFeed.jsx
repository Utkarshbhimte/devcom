import React from "react";
import "./HomePageFeed.scss";
import HomePageFeedCard from "components/HomePageFeedCard/HomePageFeedCard";

const HomePageFeed = ({ projects = [] }) => {
  return (
    <div className="home-page-feed">
      <div className="container">
        {!projects.length && (
          <div className="empty-feed">There are not Projects submitted yet</div>
        )}
        {projects.map((project) => (
          <HomePageFeedCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default HomePageFeed;
