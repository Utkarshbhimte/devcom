import React from "react";
import "./DeveloperPageComponent.scss";

const DeveloperPageComponent = ({ data }) => {
  return (
    <div className="dev-page-container">
      <div className="page-header">
        <div className="container">
          <div className="columns">
            <img
              className="avatar column is-one-fifth"
              src={data.photoURL}
              alt={data.displayName}
            />
            <div className="column is-offset">
              <h3 className="title is-3">{data.displayName}</h3>
              <p className="project-desc">{data.tagline}</p>
              <div className="buttons">
                <a
                  href={data.projectLink}
                  target="_blank"
                  className="button is-primary"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          {/* <Link href={`/dev/${data.owner}`}>
            <div className="media owner-details">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src={data.ownerData.photoURL}
                    alt={data.ownerData.displayName}
                  />
                </figure>
              </div>
              <div className="media-content">
                <p>{data.ownerData.displayName}</p>
                <span>{formatDate(data.created._seconds * 1000)}</span>
              </div>
            </div>
          </Link> */}
        </div>
      </div>

      <div className="container">
        <div className="discussion-wrapper"></div>
      </div>
    </div>
  );
};

export default DeveloperPageComponent;
