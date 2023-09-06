import { useState, useEffect } from 'react';
import { IUser } from '../types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ManageUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const axios = useAxiosPrivate();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/user/all');
      setUsers(response.data.data);
    };
    getUsers();
  }, [axios]);

  const deleteUser = async (id: string) => {
    try {
      console.log('Deleting user');
      console.log(id);
      await axios.delete(`/api/v1/user/${id}/delete`);

      setError('');
      setSuccess('Successfully deleted a user');
    } catch (err) {
      setSuccess('');
      setError('Something went wrong');
    }
  };

  const enableUser = async (id: string) => {
    try {
      console.log('Enable user');
      console.log(id);
      await axios.patch(`/api/v1/user/${id}/enable`);

      setError('');
      setSuccess('Successfully enabled a user');
    } catch (err) {
      setSuccess('');
      setError('Something went wrong');
    }
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      {success && <p className='success m-7'>{success}</p>}
      {error && <p className='error-message m-7'>{error}</p>}
      <table
        className='border border-black w-[100%] text-center'
        cellPadding={7}
      >
        <thead>
          <tr className='border border-black bg-gray-200'>
            <th className='border border-black'>Email</th>
            <th className='border border-black'>Is Deleted</th>
            <th className='border border-black'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr>
              <td className='border border-black'>{user.email}</td>
              <td className='border border-black'>
                {user.isDeleted ? 'True' : 'False'}
              </td>
              <td className='border border-black'>
                {!user.isDeleted ? (
                  <button
                    className='button-danger'
                    onClick={e => deleteUser(user._id)}
                  >
                    Delete User
                  </button>
                ) : (
                  <button
                    className='button-success'
                    onClick={e => enableUser(user._id)}
                  >
                    Enable User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
