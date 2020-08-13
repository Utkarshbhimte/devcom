import React from "react";
// import './DeveloperBannerComponent.scss';
import facebookLogo from "../../assets/facebook.svg";
import twitterLogo from "../../assets/twitter.svg";
import instagramLogo from "../../assets/instagram.svg";

const DeveloperBannerComponent = ({ data }) => {
  let { photoURL, displayName, tagline, projectLink } = data;
  return (
    <div className="flex">
      <div className="pr-8">
        <img className="h-16 w-16" src={photoURL} alt={displayName} />
      </div>

      <div className="column is-offset">
        <h3 className="text-2xl">{displayName}</h3>
        <p className="text-sm text-gray-600">{tagline}</p>
        <div className="flex items-center mt-2">
          <a
            href={projectLink}
            target="_blank"
            className="text-primary text-sm mr-4"
          >
            Get in touch
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-4 h-4 block ml-2" src={twitterLogo}></img>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-4 h-4 block ml-2" src={facebookLogo}></img>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-4 h-4 block ml-2" src={instagramLogo}></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBannerComponent;
