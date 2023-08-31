import {
  faCheck,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useEffect, useState } from 'react';
import { PASSWORD_REGEX } from '../constants';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ChangePassword = () => {
  const axios = useAxiosPrivate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(newPassword));
    setIsMatch(newPassword === newPasswordConfirmation);
  }, [newPassword, newPasswordConfirmation]);

  const updatePassword = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!isMatch) setError('Passwords do not match');
      const response = await axios.post('/api/v1/user/update-password', {
        oldPassword,
        newPassword,
      });
      console.log(response);
      setError('');
      setSuccess('changed password successfully');
    } catch (err: any) {
      setSuccess('');
      if (err?.response.status === 400) {
        setError('Invalid Data');
      } else if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <form
        onSubmit={updatePassword}
        className='sm:w-[100%] xs:w-[100%] md:w-[100%] lg:max-w-[80%] lg:w-[50%]'
      >
        <h1 className='text-5xl text-center py-5'>Change Password</h1>
        {error && <p className='error-message text-center'>{error}</p>}
        {success && <p className='success text-center'>{success}</p>}
        <div className='flex flex-col m-5 justify-center space-y-5'>
          <div className='flex items-center'>
            <label htmlFor='oldPass'>Current Password:</label>
            <input
              type='password'
              value={oldPassword}
              id='oldPass'
              className='input ml-auto sm:w-[250px] md:w-[300px]'
              placeholder='Enter current password'
              onChange={e => setOldPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-end items-center'>
            <label htmlFor='password'>
              New Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !newPassword ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='password'
              className='input ml-auto sm:w-[250px] md:w-[300px]'
              placeholder='Enter a password'
              name='password'
              id='password'
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby='passwordnote'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </div>

          <p
            id='passwordnote'
            className={
              passwordFocus && !validPassword ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{' '}
            <span aria-label='exclamation mark'>!</span>{' '}
            <span aria-label='at symbol'>@</span>{' '}
            <span aria-label='hashtag'>#</span>{' '}
            <span aria-label='dollar sign'>$</span>{' '}
            <span aria-label='percent'>%</span>
          </p>
          <div className='flex flex-end items-center'>
            <label htmlFor='confirm_pwd'>
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  isMatch && newPasswordConfirmation ? 'valid' : 'hide'
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  isMatch || !newPasswordConfirmation ? 'hide' : 'invalid'
                }
              />
            </label>
            <input
              className='input ml-auto sm:w-[250px] md:w-[300px]'
              placeholder='Enter password confirmation'
              type='password'
              id='confirm_pwd'
              onChange={e => setNewPasswordConfirmation(e.target.value)}
              value={newPasswordConfirmation}
              // required
              aria-invalid={isMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
          <p
            id='confirmnote'
            className={matchFocus && !isMatch ? 'instructions' : 'offscreen'}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          <p>
            Don't know your password?{' '}
            <Link
              className='link text-blue-700 underline'
              to='/user/reset-password'
            >
              Reset it
            </Link>
          </p>
          <button className='button w-[150px]'>Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
