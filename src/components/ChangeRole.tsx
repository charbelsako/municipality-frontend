import { FormEvent, useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { IUser } from '../types';

// submit button
const ChangeRole = () => {
  const axios = useAxiosPrivate();
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<IUser[]>();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/user/all');
      setUsers(response.data.data);
    };
    getUsers();
  }, [axios]);

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
        <input
          type='text'
          name='user'
          id='user'
          className='input'
          placeholder='Enter user id'
          onChange={e => setUser(e.target.value)}
          value={user}
        />
        <select name='users' id='users'>
          <option value='None'>None</option>
          {users &&
            users.map(value => (
              <option value={value._id}>{value.name.firstName}</option>
            ))}
        </select>
        <select
          name='role'
          id='role'
          className='input'
          onChange={e => setRole(e.target.value)}
          value={role}
        >
          <option value='None'>None</option>
          <option value='Admin'>Admin</option>
          <option value='Citizen'>Citizen</option>
        </select>
        <button className='button'>Update user role</button>
      </form>
    </div>
  );
};

export default ChangeRole;
