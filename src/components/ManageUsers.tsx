import { useState, useEffect } from 'react';
import { IUser } from '../types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ManageUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const axios = useAxiosPrivate();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/user/all?page=${page}`);
        setUsers(response.data.data.docs);
        setTotalDocs(response.data.data.totalDocs);
        setTotalPages(response.data.data.totalPages);
        setHasNextPage(response.data.data.hasNextPage);
        setHasPrevPage(response.data.data.hasPrevPage);
      } catch (err: any) {
        if (err?.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('Something went wrong');
        }
      }
    };
    getUsers();
  }, [axios, page]);

  const deleteUser = async (id: string) => {
    try {
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
      await axios.patch(`/api/v1/user/${id}/enable`);

      setError('');
      setSuccess('Successfully enabled a user');
    } catch (err) {
      setSuccess('');
      setError('Something went wrong');
    }
  };

  const prevPage = () => {
    setPage(prevState => (prevState - 1 < 1 ? 1 : prevState - 1));
  };

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      <div className='flex items-center justify-right'>
        <button
          disabled={!hasPrevPage}
          className={!hasPrevPage ? 'disabled-button' : 'button'}
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className='m-3'>{page}</span>
        <button
          className={!hasNextPage ? 'disabled-button' : 'button'}
          onClick={nextPage}
          disabled={!hasNextPage}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
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
            <tr key={user._id}>
              <td className='border border-black'>{user.email}</td>
              <td className='border border-black'>
                {user.isDeleted ? (
                  <span className='text-red-600'>Deleted</span>
                ) : (
                  <span className='text-green-600'>Enabled</span>
                )}
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
      <div className='w-[100%] pl-5 pt-5'>
        <p>Total docs: {totalDocs}</p>
        <p>Total pages: {totalPages}</p>
      </div>
    </div>
  );
};

export default ManageUsers;
