/* eslint-disable @typescript-eslint/no-unused-vars */
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
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

export function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState<string>('');
  const [_, setPasswordFocus] = useState(false);

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
    setError('');
  }, [email, password]);

  const loginUser: FormEventHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const v1 = EMAIL_REGEX.test(email);
      if (!v1) {
        setError('Invalid Entry');
        return;
      }

      const response = await axios.post(
        '/api/v1/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data.data);
      setAuth({
        email,
        roles: response.data.data.roles,
        token: response.data.data.accessToken,
      });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (loginUserError) {
      setError('Something went wrong');
      if (errRef.current) errRef.current.focus();
    }
  };

  return (
    <main className='container flex flex-col items-center space-y-5 text-xl'>
      <h1 className='text-5xl'>Login</h1>
      <div className='flex items-center justify-center'>
        <span
          ref={errRef}
          className={error ? 'error-message' : 'offscreen'}
          aria-live='assertive'
        >
          {error}
        </span>
      </div>
      <form
        onSubmit={loginUser}
        className='flex flex-col space-y-5 justify-center w-[300px] max-width-md'
      >
        <label htmlFor='username'>
          Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? 'valid' : 'hidden'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? 'hidden' : 'invalid'}
          />
        </label>
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
          className='input'
          placeholder='Enter Email here'
        />
        <p
          id='emailnote'
          className={
            emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> Must be an email
        </p>

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          aria-describedby='passwordnote'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          className='input'
          placeholder='Enter Password here'
        />

        <button
          className={!validEmail ? 'disabled-button' : 'button'}
          disabled={!validEmail ? true : false}
        >
          Log In
        </button>
      </form>
    </main>
  );
}

export default Login;
