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
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants';

function CreateCitizen() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>('');
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [status, setStatus] = useState<string>('');
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
      setStatus('Successfully created your account');
      setEmail('');
      setPassword('');
      setMatchPassword('');
    } catch (loginUserError) {
      setError('something went wrong');
      if (errRef.current) errRef?.current.focus();
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1>Sign up / Create Citizen account</h1>
      {status && <p className='success'>{status}</p>}
      <div className='flex items-center justify-center'>
        <p
          ref={errRef}
          className={error ? 'error-message' : 'offscreen'}
          aria-live='assertive'
        >
          {error}
        </p>
      </div>
      <form
        onSubmit={registerUser}
        className='grid grid-cols-2 w-[500px] space-y-3 text-left items-center'
      >
        <label htmlFor='username' className='pt-3'>
          Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? 'valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? 'hide' : 'invalid'}
          />
        </label>
        <input
          type='text'
          name='email'
          className='input'
          placeholder='Enter your email'
          ref={userRef}
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby='emailnote'
        />

        <label htmlFor='password'>
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? 'valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? 'hide' : 'invalid'}
          />
        </label>
        <input
          type='password'
          className='input'
          placeholder='Enter a password'
          name='password'
          id='password'
          aria-invalid={validPassword ? 'false' : 'true'}
          aria-describedby='passwordnote'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor='confirm_pwd'>
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={isMatch && matchPassword ? 'valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={isMatch || !matchPassword ? 'hide' : 'invalid'}
          />
        </label>
        <input
          className='input'
          placeholder='Enter password confirmation'
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
          className={matchFocus && !isMatch ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

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
