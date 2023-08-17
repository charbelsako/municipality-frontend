import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FormEvent, useState } from 'react';

function CreateStatement() {
  const [address, setAddress] = useState<string>();
  const [phoneNumber, setPhone] = useState<string>();
  const [propertyNo, setPropertyNo] = useState<string>();
  const [sectionNo, setSectionNo] = useState<string>();
  const [realEstateArea, setRealEstateArea] = useState<string>();
  const [requestFor, setRequestFor] = useState<string>();
  const [notes, setNotes] = useState<string>();

  const [err, setError] = useState<string>();

  const axiosPrivate = useAxiosPrivate();

  const createDocument = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = {
        address,
        phoneNumber,
        propertyNo,
        sectionNo,
        realEstateArea,
        requestFor,
        notes,
      };
      const response = await axiosPrivate.post(
        '/api/v1/documents/statement-document/create',
        data
      );
      console.log(response);
      setAddress('');
      setPhone('');
      setPropertyNo('');
      setSectionNo('');
      setRealEstateArea('');
      setRequestFor('');
      setNotes('');
    } catch (err: any) {
      console.log(err);
      setError(err.msg);
    }
  };

  return (
    <div className='flex justify-center flex-col items-center space-y-5'>
      <div>
        <h1 className='text-5xl m-4'>طلب افاده</h1>
      </div>
      <div className='flex   items-center justify-center'>
        <span
          className={err ? 'error-message' : 'offscreen'}
          aria-live='assertive'
        >
          {err}
        </span>
      </div>
      <form
        className='flex flex-col space-y-5 w-[500px]'
        onSubmit={createDocument}
      >
        {/* attachedDocuments */}
        <div className='flex items-center space-x-3 w-[500px]' dir='rtl'>
          <label htmlFor='address' className='pl-2'>
            العنوان
          </label>
          <input
            type='text'
            name='address'
            id='address'
            onChange={e => setAddress(e.target.value)}
            placeholder='Address'
            className='input'
            value={address}
            dir='rtl'
          />
          <label htmlFor='phone'>الهاتف</label>
          <input
            type='text'
            name='phone'
            id='phone'
            onChange={e => setPhone(e.target.value)}
            placeholder='Phone'
            dir='rtl'
            className='input'
            value={phoneNumber}
          />
        </div>
        <label htmlFor='propertyNo'>رقم العقار</label>
        <input
          type='text'
          name='propertyNo'
          id='propertyNo'
          onChange={e => setPropertyNo(e.target.value)}
          placeholder='Property No'
          value={propertyNo}
          dir='rtl'
          className='input'
        />
        <label htmlFor='propertyNo'>رقم القسم</label>
        <input
          type='text'
          name='sectionNo'
          id='sectionNo'
          onChange={e => setSectionNo(e.target.value)}
          placeholder='Section No'
          value={sectionNo}
          dir='rtl'
          className='input'
        />
        <label htmlFor='realEstateArea'>منطقة عقارية</label>
        <input
          type='text'
          name='realEstateArea'
          id='realEstateArea'
          onChange={e => setRealEstateArea(e.target.value)}
          placeholder='Real Estate Area'
          value={realEstateArea}
          dir='rtl'
          className='input'
        />
        <label htmlFor='requestFor'>للحصول على</label>
        <input
          type='text'
          name='requestFor'
          id='requestFor'
          onChange={e => setRequestFor(e.target.value)}
          placeholder='Request for'
          value={requestFor}
          dir='rtl'
          className='input'
        />
        <label htmlFor='notes'>notes</label>
        <input
          type='text'
          name='notes'
          id='notes'
          dir='rtl'
          onChange={e => setNotes(e.target.value)}
          placeholder='Notes'
          value={notes}
          className='input'
        />
        <button className='button'>Submit</button>
      </form>
    </div>
  );
}

export default CreateStatement;
