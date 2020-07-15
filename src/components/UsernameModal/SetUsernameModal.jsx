import React, { useState, useEffect } from 'react';
import { useAuth } from 'util/auth.js';
import { updateUsername } from 'util/db';
import './SetUsernameModal.scss';

var inputTimer = null;
const WAIT_INTERVAL = 2000; // wait time for which the user hasnt typed to check for username

const acceptedUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const alphanumericRegex = /[a-z\d-]+/i;
const consecutiveHyphenRegex = /^(([a-z\d]+-[a-z\d]+)|[a-z\d])*$/i;
const endHypenRegex = /^[a-z0-9].*(?<!-)$/i;
const maxCharacterRegex = /^.{1,39}$/;

const SetUsernameModal = () => {
  let { user } = useAuth();

  if (!user) return null;

  let { githubUsername, username: currentUsername } = user;

  // currentUsername!='' works. if(currentUsername) doesnt always work.
  if (user != false && currentUsername != '') return null;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); // For username validation flag

  const [usernameInput, setUsernameInput] = useState(githubUsername);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isServerError, setIsServerError] = useState(false); // if upadate username causes an error.

  //Called after the user is done checking for username availability.
  const onUsernameCheck = (result) => {
    setIsLoading(false);
    if (result.error) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setIsUsernameAvailable(result.isUsernameAvailable);
  };

  // Checkd if the username is available or not
  const fetchUsernameCheck = (username) => {
    if (!username.length) return; //don't fetch username if input is empty
    fetch(`/api/username?username=${username}`)
      .then((data) => data.json())
      .then(onUsernameCheck);
  };

  useEffect(() => {
    fetchUsernameCheck(githubUsername);
  }, []);

  // Triggers whenever user types a new character in username box
  const onChangeUsername = (event) => {
    clearTimeout(inputTimer);

    setIsLoading(true);
    let inputValue = event.target.value;

    inputValue = inputValue.trim();
    setUsernameInput(inputValue);

    // Only check for username if the person has stopped typing.
    inputTimer = setTimeout(() => {
      fetchUsernameCheck(inputValue);
    }, WAIT_INTERVAL);
  };

  //Triggered when user clicks submit
  const onSubmitUsername = (e) => {
    e.preventDefault();
    // Match username to
    if (usernameInput.match(acceptedUsernameRegex) && !isError) {
      updateUsername(user.uid, usernameInput)
        .then((data) => console.log('data', data))
        .catch((error) => {
          setIsServerError(true);
          console.log(error);
        });
    } else setIsServerError(true);
  };

  //Checks the regex validation for the username
  const renderCheckValidation = (regex) => {
    if (usernameInput.length && usernameInput.match(regex)) {
      return (
        <span class='icon' style={{ color: '#0d0' }}>
          <i class='fas fa-check'></i>
        </span>
      );
    }
  };

  //renders help Text under the username input field to display if the username is available or not
  const renderInputHelpText = () => {
    if (isLoading) {
      return (
        <div className='help username-check'>
          <p>Checking if {usernameInput} is available</p>
          <div className='loader is-loading username-loader'></div>
        </div>
      );
    }
    if (isError) {
      return (
        <p className='help is-danger'>We're Sorry. Some error has occurred </p>
      );
    }
    if (isUsernameAvailable) {
      if (usernameInput === githubUsername) {
        return (
          <p className='help is-success'> Your Github username is available</p>
        );
      } else if (!usernameInput) return null;
      return <p className='help is-success'> {usernameInput} is available</p>;
    } else {
      if (usernameInput === githubUsername) {
        <p className='help is-danger'>Your Github username is not available</p>;
      }
      return (
        <p className='help is-danger'>
          Sorry! {usernameInput} is not available
        </p>
      );
    }
  };

  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='card work-card'>
        <div className='modal-content'>
          <h3 className='title is-4'>Set a username for your account</h3>
          <form onSubmit={onSubmitUsername}>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className={`input`}
                  type='text'
                  placeholder='Text input'
                  value={usernameInput}
                  onInput={onChangeUsername}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-user'></i>
                </span>
                <span className='icon is-small is-right'>
                  <i className='fas fa-check'></i>
                </span>
              </div>
              {renderInputHelpText()}
            </div>
            <div className='content'>
              <p>Your username should follow the following guidelines:</p>
              <ul>
                <li>
                  Only contain alphanumeric characters or hyphens.
                  {renderCheckValidation(alphanumericRegex)}
                </li>
                <li>
                  Cannot have multiple consecutive hyphens.
                  {renderCheckValidation(consecutiveHyphenRegex)}
                </li>
                <li>
                  Cannot begin or end with a hyphen.
                  {renderCheckValidation(endHypenRegex)}
                </li>
                <li>
                  Maximum 39 characters.
                  {renderCheckValidation(maxCharacterRegex)}
                </li>
              </ul>
            </div>
            {isServerError ? (
              <div class='notification is-danger'>
                Sorry something went wrong!
              </div>
            ) : null}
            <div className='field username-right-align'>
              <div class='control'>
                <button class='button is-link' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetUsernameModal;
