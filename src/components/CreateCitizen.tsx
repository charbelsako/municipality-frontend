import {
  FormEvent,
  FormEventHandler,
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './register.module.css';
import { EMAIL_REGEX } from '../constants';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%]).{8,24}/;

function CreateCitizen() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState<string>('');
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('something went wrong');

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setIsMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setError('');
  }, [email, password, matchPassword]);

  const registerUser: FormEventHandler = (e: FormEvent) => {
    try {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PASSWORD_REGEX.test(password);
      if (!v1 || !v2) {
        setError('Invalid Entry');
        return;
      }
      setSuccess(true);
      setEmail('');
      setPassword('');
      setMatchPassword('');
    } catch (loginUserError) {
      setError('something went wrong');
      if (errRef.current) errRef?.current.focus();
    }
  };

  return (
    <div>
      <h1>Create Citizen account</h1>
      <div className='flex items-center justify-center'>
        <p
          ref={errRef}
          className={error ? 'error-message' : 'offscreen'}
          aria-live='assertive'
        >
          {error}
        </p>
      </div>
      <form onSubmit={registerUser}>
        <label htmlFor='username'>
          Username:
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? styles.valid : styles.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? styles.hide : styles.invalid}
          />
        </label>
        <div>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            name='email'
            ref={userRef}
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
        </div>
        <p
          id='emailnote'
          className={
            emailFocus && email && !validEmail
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          <br />
          Must be an email
        </p>

        <label htmlFor='password'>
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? styles.valid : styles.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validPassword || !password ? styles.hide : styles.invalid
            }
          />
        </label>
        <input
          type='password'
          name='password'
          id='password'
          aria-invalid={validPassword ? 'false' : 'true'}
          aria-describedby='passwordnote'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />

        <p
          id='passwordnote'
          className={
            passwordFocus && !validPassword
              ? styles.instructions
              : styles.offscreen
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
        <div>
          <label htmlFor='confirm_pwd'>
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={isMatch && matchPassword ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                isMatch || !matchPassword ? styles.hide : styles.invalid
              }
            />
          </label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={e => setMatchPassword(e.target.value)}
            value={matchPassword}
            required
            aria-invalid={isMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={
              matchFocus && !isMatch ? styles.instructions : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>

        <button
          disabled={!validEmail || !validPassword || !isMatch ? true : false}
        >
          Create Citizen
        </button>
      </form>
    </div>
  );
}

export default CreateCitizen;
