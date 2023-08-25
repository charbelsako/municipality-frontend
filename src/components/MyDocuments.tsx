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
      ) : documents.length === 0 ? (
        <p className='text-3xl'>No documents to show</p>
      ) : (
        <table className='border border-black w-[500px]'>
          <thead>
            <tr>
              <th className='border border-black'>ID</th>
              <th className='border border-black'>Status</th>
              <th className='border border-black'>Request For</th>
              <th className='border border-black'>Type</th>
            </tr>
          </thead>
          <tbody className='border border-black'>
            {documents.map(doc => (
              <tr key={doc._id} className='border border-black'>
                <td className='p-3 border border-black'>
                  <h1>
                    <Link to={`/documents/${doc._id}`} className='link'>
                      {doc._id}
                    </Link>
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
