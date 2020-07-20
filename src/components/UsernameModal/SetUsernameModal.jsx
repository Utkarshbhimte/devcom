import React, { useState, useEffect } from 'react';
import { useAuth } from 'util/auth.js';
import {
  alphanumericRegex,
  consecutiveHyphenRegex,
  endHypenRegex,
  maxCharacterRegex,
  checkRegexValid,
} from '../../util/util';
import './SetUsernameModal.scss';

var inputTimer = null;
const WAIT_INTERVAL = 2000; // wait time for which the user hasnt typed to check for username

const SetUsernameModal = () => {
  let { user } = useAuth();

  if (!user) return null;

  let { githubUsername, username: currentUsername } = user;

  if (user != false && currentUsername) return null;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); // For username validation flag

  const [usernameInput, setUsernameInput] = useState(githubUsername);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false); // if update username causes an error.
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [checkAlphanumic, setCheckAlphanumeric] = useState(false);
  const [checkConsecutiveHyphen, setCheckConsecutiveHyphen] = useState(false);
  const [checkEndHyphen, setCheckEndHyphen] = useState(false);
  const [checkMaxCharacter, setCheckMaxCharacter] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

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
    fetch(`/api/check-username?username=${username}`)
      .then((data) => data.json())
      .then(onUsernameCheck);
  };

  useEffect(() => {
    // Check for username availability of github username
    fetchUsernameCheck(githubUsername);
    // Check username validation for github username
    setCheckAlphanumeric(checkRegexValid(githubUsername, alphanumericRegex));
    setCheckConsecutiveHyphen(
      checkRegexValid(githubUsername, consecutiveHyphenRegex)
    );
    setCheckEndHyphen(checkRegexValid(githubUsername, endHypenRegex));
    setCheckMaxCharacter(checkRegexValid(githubUsername, maxCharacterRegex));
  }, []);

  useEffect(() => {
    if (usernameInput.length && !isLoading && isUsernameAvailable && !isError) {
      let isUsernameValid =
        checkAlphanumic &&
        checkConsecutiveHyphen &&
        checkEndHyphen &&
        checkMaxCharacter;
      setIsSubmitEnabled(isUsernameValid);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [
    checkAlphanumic,
    checkConsecutiveHyphen,
    checkEndHyphen,
    checkMaxCharacter,
    isLoading,
    isUsernameAvailable,
  ]);

  // Triggers whenever user types a new character in username box
  const onChangeUsername = (event) => {
    clearTimeout(inputTimer);

    setIsLoading(true);
    setIsSubmitError(false);
    let input = event.target.value;

    input = input.trim();

    // Update usernameHook and regex validations for username
    setUsernameInput(input);
    setCheckAlphanumeric(checkRegexValid(input, alphanumericRegex));
    setCheckConsecutiveHyphen(checkRegexValid(input, consecutiveHyphenRegex));
    setCheckEndHyphen(checkRegexValid(input, endHypenRegex));
    setCheckMaxCharacter(checkRegexValid(input, maxCharacterRegex));

    // Only check for username if the person has stopped typing.
    inputTimer = setTimeout(() => {
      fetchUsernameCheck(input);
    }, WAIT_INTERVAL);
  };

  //Triggered when user clicks submit
  const onSubmitUsername = (e) => {
    e.preventDefault();

    let body = { username: usernameInput, uid: user.uid };
    fetch(`/api/update-username`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((error) => {
        setIsSubmitError(true);
        setSubmitErrorMessage('Sorry! Something went wrong!');
        console.log(error);
      });
  };

  //Display check or cross symbol based on check value
  const renderCheckValidation = (check) => {
    if (usernameInput.length === 0) return null;
    if (check) {
      return (
        <span class='icon' style={{ color: '#0d0' }}>
          <i class='fas fa-check'></i>
        </span>
      );
    } else {
      return (
        <span class='icon' style={{ color: 'red' }}>
          <i class='fas fa-times'></i>
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
                  {renderCheckValidation(checkAlphanumic)}
                </li>
                <li>
                  Cannot have multiple consecutive hyphens.
                  {renderCheckValidation(checkConsecutiveHyphen)}
                </li>
                <li>
                  Cannot begin or end with a hyphen.
                  {renderCheckValidation(checkEndHyphen)}
                </li>
                <li>
                  Maximum 39 characters.
                  {renderCheckValidation(checkMaxCharacter)}
                </li>
              </ul>
            </div>
            {isSubmitError ? (
              <div class='notification is-danger'>
                {submitErrorMessage || 'Sorry! Something went wrong'}
              </div>
            ) : null}
            <div className='field username-right-align'>
              <div class='control'>
                <button
                  class='button is-primary'
                  type='submit'
                  disabled={!isSubmitEnabled}
                >
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
