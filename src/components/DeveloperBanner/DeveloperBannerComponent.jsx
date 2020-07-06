import React from 'react';
import './DeveloperBannerComponent.scss';

const DeveloperBannerComponent = ({ data }) => {
  let { photoURL, displayName, tagline, projectLink } = data;
  return (
    <div className='card dev-banner'>
      <div className='columns'>
        <div className='column is-one-fifth'>
          <img className='avatar level-item' src={photoURL} alt={displayName} />
        </div>

        <div className='column is-offset'>
          <h3 className='title is-3'>{displayName}</h3>
          <p className='project-desc'>{tagline}</p>
          <div className='buttons'>
            <a href={projectLink} target='_blank' className='button is-primary'>
              Get in touch
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon'>
                <i className='fab fa-twitter'></i>
              </span>
            </a>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon'>
                <i className='fab fa-facebook-f'></i>
              </span>
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon'>
                <i className='fab fa-instagram'></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBannerComponent;
