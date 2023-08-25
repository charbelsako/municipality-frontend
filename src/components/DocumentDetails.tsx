import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { IDocumentRequest } from '../types';
import { useParams } from 'react-router-dom';

const DocumentDetails = () => {
  const axios = useAxiosPrivate();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState<IDocumentRequest>();

  useEffect(() => {
    const getMyDocuments = async () => {
      const response = await axios.get(`/api/v1/documents/${params.id}`);
      setDocument(response.data.data);
      setLoading(false);
    };
    getMyDocuments();
  }, [axios, params.id]);

  return (
    <div className='pt-5'>
      {loading ? (
        <>Loading...</>
      ) : !document ? (
        <>Null</>
      ) : (
        <div className='space-y-5'>
          <h1 className='text-6xl m-3'>{document && document.type}</h1>

          <p>
            <span className='font-bold'>Name: </span>
            {document?.callee.name.firstName} {document?.callee.name.fatherName}{' '}
            {document?.callee.name.lastName}
          </p>

          <p>
            <span className='font-bold'>Address: </span>
            {document?.address}
          </p>

          <p>
            <span className='font-bold'>Phone Number: </span>
            {document?.phoneNumber}
          </p>

          <p>
            <span className='font-bold'>Property No: </span>
            {document?.propertyNo}
          </p>

          <p>
            <span className='font-bold'>Notes: </span>
            {document?.notes}
          </p>

          <p>
            <span className='font-bold'>Real Estate Area: </span>
            {document?.realEstateArea}
          </p>

          <p>
            <span className='font-bold'>Section No: </span>
            {document?.sectionNo}
          </p>

          <p>
            <span className='font-bold'>Request For: </span>
            {document?.requestFor}
          </p>

          <p>
            <span className='font-bold'>Status: </span>
            <span
              className={
                document.status === 'Pending'
                  ? `text-yellow-800 font-bold`
                  : 'text-green-800'
              }
            >
              {document?.status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
