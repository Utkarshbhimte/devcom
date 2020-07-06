import React from 'react';
import './DeveloperBlogCardComponent.scss';

const DeveloperBlogCardComponent = ({ blog }) => {
  let { title, desc, tags, blogLink } = blog;
  return (
    <div className='card dev-blog-card'>
      <div className='content'>
        <div className='columns'>
          <div className='column is-four-fifth'>
            <h3 class='blog-title'>{title}</h3>
          </div>
          <div className='column is-offset'>
            <a
              class='popout-icon'
              href={blogLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon'>
                <i className='fas fa-external-link-alt'></i>
              </span>
            </a>
          </div>
        </div>
        <p>{desc}</p>
        {tags.map((tag, index) => (
          <span key={index} class='tag is-light'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
export default DeveloperBlogCardComponent;
