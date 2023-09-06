import { FormEvent, useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { SECTS, EMAIL_REGEX } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IName } from '../types';

function UserProfile() {
  const [personalSect, setPersonalSect] = useState('');
  const [recordSect, setRecordSect] = useState('');
  const [recordNumber, setRecordNumber] = useState('');
  const [sex, setSex] = useState('');
  const [name, setName] = useState<IName>();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [success, setStatus] = useState('');
  const [error, setError] = useState('');

  const axios = useAxiosPrivate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('/api/v1/user/profile');
        const { data } = response.data;
        setPersonalSect(data.personalInfo.sect);
        setRecordSect(data.recordInfo.sect);
        setSex(data.sex);
        setName(data.name);
        setEmail(data.email);
        setRecordNumber(data.recordInfo.number);
      } catch (err: any) {
        if (err?.response) return setStatus(err.response.data.message);
        setError(err.message);
      }
    };
    getUserDetails();
  }, [axios]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSaveUserData = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!validEmail) {
        setStatus('');
        setError('invalid entry');
        return;
      }

      const data = {
        name,
        email,
        personalInfo: { sect: personalSect },
        recordInfo: { sect: recordSect, number: recordNumber },
        sex,
      };

      await axios.post('/api/v1/user/update-user', data);
      setError('');
      setStatus('User updated successfully');
    } catch (err: any) {
      setStatus('');
      setError(err.message);
    }
  };

  return (
    <>
      <h1 className='text-5xl pt-2 pb-5 text-center'>Profile</h1>
      {error && <p className='error-message'>{error}</p>}
      {success && <p className='success'>{success}</p>}
      <form onSubmit={handleSaveUserData}>
        <div className='justify-center items-center grid grid-cols-2 gap-3 p-4'>
          {/* <p>{status}</p> */}
          <p className=''>First Name: </p>
          <input type='text' defaultValue={name?.firstName} className='input' />
          <label htmlFor='lastName'>Last Name: </label>
          <input type='text' defaultValue={name?.lastName} className='input' />

          <label htmlFor='fatherName'>Father Name: </label>
          <input
            type='text'
            defaultValue={name?.fatherName}
            className='input'
          />

          <label htmlFor='motherName'>Mother Name: </label>
          <input
            type='text'
            defaultValue={name?.motherName}
            className='input'
          />

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
          <input
            type='text'
            id='email'
            defaultValue={email}
            className='input'
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor='sex'>Sex: </label>
          <select
            name='sex'
            id='sex'
            value={sex}
            onChange={e => setSex(e.target.value)}
          >
            <option value={'أنثى'}>أنثى</option>
            <option value={'ذكر'}>ذكر</option>
          </select>

          <label htmlFor='personalSect'>Personal Sect: </label>
          <select
            name='personalSect'
            id='personalSect'
            value={personalSect}
            onChange={e => setPersonalSect(e.target.value)}
          >
            {Object.values(SECTS).map((sect, index) => (
              <option key={index} value={sect}>
                {sect}
              </option>
            ))}
          </select>

          <label htmlFor='recordSect'>Record Sect: </label>
          <select
            name='recordSect'
            id='recordSect'
            value={recordSect}
            onChange={e => setRecordSect(e.target.value)}
          >
            {Object.values(SECTS).map((sect, index) => (
              <option key={index} value={sect}>
                {sect}
              </option>
            ))}
          </select>

          <label htmlFor='recordNumber'>Record Number: </label>
          <input
            type='text'
            value={recordNumber}
            onChange={e => setRecordNumber(e.target.value)}
          />

          <button className='button col-start-2 col-span-1 mt-7'>
            Update Details
          </button>
        </div>
      </form>
      <Link
        to='/user/change-password'
        className='p-4 link text-blue-700 underline'
      >
        Change Password
      </Link>
    </>
  );
}

export default UserProfile;
