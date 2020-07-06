import React from 'react';
import './DeveloperProjectCardComponent.scss';

const DeveloperProjectCardComponent = ({ project }) => {
  let { title, desc, tags, projectLink, codeLink } = project;
  return (
    <div className='card dev-project-card'>
      <div className='content'>
        <h3 className='title'>{title}</h3>
        <p>{desc}</p>
        {tags.map((tag) => (
          <span class='tag is-light'>{tag}</span>
        ))}
        <br /> <br />
        <div className='columns'>
          <div className='column is-four-fifths'>
            <a href='#'>{projectLink}</a>
          </div>
          <div className='column github-logo'>
            <a href={codeLink} target='_blank' rel='noopener noreferrer'>
              <span className='icon'>
                <i className='fab fa-github fa-3x'></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProjectCardComponent;
