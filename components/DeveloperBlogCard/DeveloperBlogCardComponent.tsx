import React from 'react';
import './DeveloperBlogCardComponent.scss';
import externalLinkLogo from '../../assets/external-link.svg';

const DeveloperBlogCardComponent = ({ blog }) => {
  let { title, desc, tags, blogLink } = blog;
  return (
    <div className='card dev-blog-card'>
      <div className='content'>
        <div className='columns'>
          <div className='column is-four-fifth'>
            <h3>{title}</h3>
          </div>
          <div className='column is-offset'>
            <a
              className='popout-icon'
              href={blogLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img style={{ height: '1.3rem' }} src={externalLinkLogo}></img>
            </a>
          </div>
        </div>
        <p>{desc}</p>
        {tags.map((tag, index) => (
          <span key={index} className='tag is-light'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
export default DeveloperBlogCardComponent;
