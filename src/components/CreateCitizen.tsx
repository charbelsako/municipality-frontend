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
import { EMAIL_REGEX, PASSWORD_REGEX, SECTS, SEXES } from '../constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateCitizen() {
  const axios = useAxiosPrivate();
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

  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [personalSect, setPersonalSect] = useState<string>('');
  const [recordSect, setRecordSect] = useState<string>('');
  const [recordNumber, setRecordNumber] = useState<string>();
  const [sex, setSex] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<any>();

  const [fatherName, setFatherName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [motherName, setMotherName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>();

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

  const registerUser: FormEventHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PASSWORD_REGEX.test(password);
      if (!v1 || !v2) {
        setError('Invalid Entry');
        return;
      }
      console.log('data', {
        email,
        password,
        phoneNumbers: phone,
        name: {
          firstName,
          motherName,
          fatherName,
          lastName,
        },
        dateOfBirth,
        personalSect,
        recordSect,
        recordNumber,
        sex,
      });

      const response = await axios.post('/api/v1/user/signup', {
        email,
        password,
        phoneNumbers: phone,
        name: {
          firstName,
          motherName,
          fatherName,
          lastName,
        },
        dateOfBirth,
        personalSect,
        recordSect,
        recordNumber,
        sex,
      });
      console.log(response);
      setSuccess(true);
      setEmail('');
      setPassword('');
      setMatchPassword('');
    } catch (registerUserError: any) {
      if (registerUserError.response) {
        console.log('error', registerUserError.response.data.error);
        setError(registerUserError.response.data.error);
      } else {
        setError('something went wrong');
      }
      if (errRef.current) errRef?.current.focus();
    }
  };

  return (
    <div className='flex flex-col items-center pb-10'>
      <h1 className='text-4xl p-3 m-2'> Sign up / Create Citizen account</h1>
      <div className='flex items-center justify-center'>
        <p
          ref={errRef}
          className={error ? 'error-message' : 'offscreen'}
          aria-live='assertive'
        >
          {error && Object.keys(error).length > 0
            ? Object.keys(error).map(key => {
                return <p>{error[key]}</p>;
              })
            : error}
        </p>
      </div>
      <form
        onSubmit={registerUser}
        className='flex flex-col w-[500px] space-y-3 text-left'
      >
        <label htmlFor='username'>
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
          // required
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby='emailnote'
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id='emailnote'
          className={
            emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
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
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />

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
          // required
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

        <label htmlFor='first-name'>First Name:</label>
        <input
          className='input'
          placeholder='Enter first-name'
          type='text'
          id='first-name'
          name='first-name'
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          // required
        />

        <label htmlFor='last-name'>Last Name:</label>
        <input
          className='input'
          placeholder='Enter Last Name'
          type='text'
          id='last-name'
          name='last-name'
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          // required
        />

        <label htmlFor='mother-name'>Mother Name:</label>
        <input
          className='input'
          placeholder='Enter mother Name'
          type='text'
          id='mother-name'
          name='mother-name'
          onChange={e => setMotherName(e.target.value)}
          value={motherName}
          // required
        />
        <label htmlFor='father-name'>Father Name:</label>
        <input
          className='input'
          placeholder='Enter father Name'
          type='text'
          id='father-name'
          name='father-name'
          onChange={e => setFatherName(e.target.value)}
          value={fatherName}
          // required
        />

        <label htmlFor='address'>Address:</label>
        <input
          className='input'
          placeholder='Enter address'
          type='text'
          id='address'
          onChange={e => setAddress(e.target.value)}
          value={address}
          // required
        />

        <label htmlFor='sex'>Sex:</label>
        <select
          className='input'
          onChange={e => setSex(e.target.value)}
          value={sex}
        >
          <option value='None'>None</option>
          {Object.values(SEXES).map((sect, index) => (
            <option key={index} value={sect}>
              {sect}
            </option>
          ))}
        </select>

        <label htmlFor='record-sect'>Record Sect:</label>
        <select
          id='record-sect'
          className='input'
          onChange={e => setRecordSect(e.target.value)}
          value={recordSect}
        >
          <option value='None'>None</option>
          {Object.values(SECTS).map((sect, index) => (
            <option key={index} value={sect}>
              {sect}
            </option>
          ))}
        </select>

        <label htmlFor='personal-sect'>Personal Sect:</label>
        <select
          value={personalSect}
          id='personal-sect'
          className='input'
          onChange={e => setPersonalSect(e.target.value)}
        >
          <option value='None'>None</option>
          {Object.values(SECTS).map((sect, index) => (
            <option key={index} value={sect}>
              {sect}
            </option>
          ))}
        </select>

        <label htmlFor='record-number'>Record Number:</label>
        <input
          type='text'
          name='record-number'
          id='record-number'
          className='input'
          placeholder='Enter record number'
          value={recordNumber}
          onChange={e => setRecordNumber(e.target.value)}
        />

        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          name='phone'
          id='phone'
          className='input'
          placeholder='Enter phone number'
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <label htmlFor='date-of-birth'>Date of Birth</label>
        <DatePicker
          selected={dateOfBirth}
          onChange={date => setDateOfBirth(date)}
          className='input w-[100%] '
        />

        <hr />
        <button
          // disable={!validEmail || !validPassword || !isMatch ? true : false}
          className='button'
        >
          Create Citizen
        </button>
      </form>
    </div>
  );
}

export default CreateCitizen;
