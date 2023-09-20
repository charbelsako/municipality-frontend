import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { IDocumentRequest } from '../types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import DatePicker from 'react-datepicker';

const ProcessDocument = () => {
  const [submittedAt, setSubmittedAtDate] = useState<any>();
  const [documentId, setDocumentId] = useState<string>();
  const [document, setDocument] = useState<IDocumentRequest>();
  const axios = useAxiosPrivate();
  const params = useParams();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getDocument = async () => {
      const response = await axios.get(`/api/v1/documents/${params.id}`);
      setDocument(response.data.data);
    };
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const processDocument = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post('/api/v1/documents/:id/process', {
        documentId,
        submittedAt,
      });

      setError('');
      setSuccess('Successfully processed document');
    } catch (e) {
      setError('something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className='flex flex-col mx-5 mt-5'>
      {success && <p className='success'>{success}</p>}
      {error && <p className='error-message'>{error}</p>}
      <h1 className='text-3xl mb-5'>Document ID: {document?._id}</h1>
      <p className='text-xl mb-3'>Document Type: {document?.type}</p>
      <p>
        Full Name: {document?.callee?.name?.firstName}{' '}
        {document?.callee?.name?.fatherName} {document?.callee?.name?.lastName}
      </p>
      <p>Address: {document?.address}</p>
      <p>Phone Number: {document?.phoneNumber}</p>
      <p>Property Number: {document?.propertyNo}</p>
      <p>Real Estate Area: {document?.realEstateArea}</p>
      <p>Request For: {document?.requestFor}</p>
      <p>Section Number: {document?.sectionNo}</p>
      <p>Document Status: {document?.status}</p>

      <h1 className='text-2xl mt-10 mb-5'>Submit the document</h1>
      <form
        className='flex flex-col justify-center w-[500px]'
        onSubmit={processDocument}
      >
        <div className='m-3'>
          <label htmlFor='documentId'>Document ID: </label>
          <input
            type='text'
            className='input'
            onChange={e => setDocumentId(e.target.value)}
          />
        </div>

        <div className='m-3'>
          <label htmlFor='documentId'>Submitted At: </label>
          <DatePicker
            onChange={date => setSubmittedAtDate(date)}
            className='input w-[100%] '
          />
        </div>

        <button className='w-[200px] button'>Process Document</button>
      </form>
    </div>
  );
};

export default ProcessDocument;
