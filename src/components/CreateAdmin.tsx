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
import { EMAIL_REGEX, PASSWORD_REGEX, ROLES, SECTS, SEXES } from '../constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import DatePicker from 'react-datepicker';

function CreateAdmin() {
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

  const [role, setRole] = useState('');

  const [fatherName, setFatherName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [motherName, setMotherName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();

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

  const createAdmin: FormEventHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PASSWORD_REGEX.test(password);
      if (!v1 || !v2) {
        setError('Invalid Entry');
        return;
      }
      await axios.post('/api/v1/user/create-admin', {
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
        role,
      });

      setEmail('');
      setPassword('');
      setMatchPassword('');
    } catch (loginUserError) {
      setError('something went wrong');
      if (errRef.current) errRef.current.focus();
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
      <form onSubmit={createAdmin}>
        <label htmlFor='email'>
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
        <div>
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

        <div>
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
        </div>

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

        <label htmlFor='role'>Role</label>
        <select name='role' id='role' onChange={e => setRole(e.target.value)}>
          <option value='None'>None</option>
          {Object.values(ROLES).map(role => (
            <option value={role}>{role}</option>
          ))}
        </select>

        <button
          disabled={!validEmail || !validPassword || !isMatch ? true : false}
        >
          Create Citizen
        </button>
      </form>
    </div>
  );
}

export default CreateAdmin;
