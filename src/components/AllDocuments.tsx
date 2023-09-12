import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { IDocumentRequest } from '../types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyDocuments = () => {
  const axios = useAxiosPrivate();

  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<IDocumentRequest[]>([]);

  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const getMyDocuments = async () => {
      const response = await axios.get(`/api/v1/documents/all?page=${page}`);
      setDocuments(response.data.data.docs);
      setTotalDocs(response.data.data.totalDocs);
      setTotalPages(response.data.data.totalPages);
      setHasNextPage(response.data.data.hasNextPage);
      setHasPrevPage(response.data.data.hasPrevPage);
      setLoading(false);
    };
    getMyDocuments();
  }, [axios, page]);

  const prevPage = () => {
    setPage(prevState => (prevState - 1 < 1 ? 1 : prevState - 1));
  };

  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
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
      {loading ? (
        <>Loading...</>
      ) : documents.length === 0 ? (
        <p className='text-3xl'>No documents to show</p>
      ) : (
        <table className='border border-black w-[100%] text-center'>
          <thead>
            <tr>
              <th className='border border-black'>ID</th>
              <th className='border border-black'>Status</th>
              <th className='border border-black'>Request For</th>
              <th className='border border-black'>Type</th>
              <th className='border border-black'>Action</th>
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
                <td>
                  <Link className='button' to={`/documents/${doc._id}/process`}>
                    Process doc
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='w-[100%] pl-5 pt-5'>
        <p>Total docs: {totalDocs}</p>
        <p>Total pages: {totalPages}</p>
      </div>
    </div>
  );
};

export default MyDocuments;
