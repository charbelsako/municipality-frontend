import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { IDocumentRequest } from '../types';
import { Link } from 'react-router-dom';

const MyDocuments = () => {
  const axios = useAxiosPrivate();

  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<IDocumentRequest[]>([]);

  useEffect(() => {
    const getMyDocuments = async () => {
      const response = await axios.get('/api/v1/documents/my');
      setDocuments(response.data.data);
      setLoading(false);
    };
    getMyDocuments();
  }, [axios]);

  return (
    <div className='flex justify-center mt-10'>
      {loading ? (
        <>Loading...</>
      ) : (
        <table className='border border-black'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Request For</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody className='border border-black'>
            {documents.map(doc => (
              <tr key={doc._id} className='border border-black'>
                <td className='p-3 border border-black'>
                  <h1>
                    <Link to={`${doc._id}`}>{doc._id}</Link>
                  </h1>
                </td>

                <td className='p-3 border border-black'>
                  <h1>{doc.status}</h1>
                </td>

                <td className='p-3 border border-black'>
                  <h1>{doc.requestFor}</h1>
                </td>

                <td className='p-3 border border-black'>
                  <h1>{doc.type}</h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDocuments;
