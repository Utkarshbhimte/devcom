import React from 'react';
import './DeveloperProjectCardComponent.scss';
import githubLogo from '../../assets/github.svg';

const DeveloperProjectCardComponent = ({ project }) => {
  let { title, desc, tags, projectLink, codeLink } = project;
  return (
    <div className='card dev-project-card'>
      <div className='content'>
        <h3>{title}</h3>
        <p>{desc}</p>
        {tags.map((tag, index) => (
          <span key={index} className='tag is-light'>
            {tag}
          </span>
        ))}
        <br /> <br />
        <div className='columns'>
          <div className='column is-four-fifths'>
            <a href='#'>{projectLink}</a>
          </div>
          <div className='column github-logo'>
            <a href={codeLink} target='_blank' rel='noopener noreferrer'>
              <img src={githubLogo}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProjectCardComponent;
