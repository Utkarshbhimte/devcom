import React from "react";
// import './DeveloperBannerComponent.scss';
import facebookLogo from "../../assets/facebook.svg";
import twitterLogo from "../../assets/twitter.svg";
import instagramLogo from "../../assets/instagram.svg";

const DeveloperBannerComponent = ({ data }) => {
  let { photoURL, displayName, tagline, projectLink } = data;
  return (
    <div className="card dev-banner">
      <div className="columns">
        <div className="column is-one-fifth">
          <img className="avatar" src={photoURL} alt={displayName} />
        </div>

        <div className="column is-offset">
          <h3 className="title is-3">{displayName}</h3>
          <p className="project-desc">{tagline}</p>
          <div className="buttons">
            <a href={projectLink} target="_blank" className="button is-primary">
              Get in touch
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterLogo}></img>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookLogo}></img>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramLogo}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBannerComponent;
