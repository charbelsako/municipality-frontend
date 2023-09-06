import { FormEvent, useEffect, useMemo, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { IUser } from '../types';
import Select from 'react-select';
import { ROLES } from '../constants';

// submit button
const ChangeRole = () => {
  const axios = useAxiosPrivate();
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<IUser[]>();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const options = useMemo(() => {
    return [{ value: 'None', label: 'None' }];
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/user/all');
      setUsers(response.data.data);
    };
    getUsers();
  }, [axios]);

  useEffect(() => {
    users?.forEach(user => {
      options.push({ value: user.email, label: user.email });
    });
  }, [options, users]);

  const setUserRole = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post('/api/v1/user/change-role', {
        id: user,
        role,
      });
      setError('');
      setSuccess('Successfully updated user role');
    } catch (err) {
      setSuccess('');
      setError('Something went wrong');
    }
  };

  return (
    <div className='flex flex-col m-5'>
      <h1 className='text-4xl py-5'>Change User Role</h1>
      {success && <p className='success'>{success}</p>}
      {error && <p className='error-message'>{error}</p>}
      <form
        onSubmit={setUserRole}
        className='flex flex-col w-[300px] space-y-5'
      >
        <label htmlFor='users'>Choose User Id</label>
        <Select options={options} onChange={e => e && setUser(e.value)} />

        <label htmlFor='users'>Select Desired Role</label>
        <select
          name='role'
          id='role'
          className='input'
          onChange={e => setRole(e.target.value)}
          value={role}
        >
          <option value='None'>None</option>
          {Object.values(ROLES).map(role => (
            <option value={role} key={role}>
              {role}
            </option>
          ))}
        </select>
        <p className='text-sm'>
          Double check information before pressing update
        </p>
        <button className='button'>Update user role</button>
      </form>
    </div>
  );
};

export default ChangeRole;
