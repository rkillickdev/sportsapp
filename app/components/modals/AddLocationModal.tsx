'use client'

import Image from 'next/image';
import { axiosReq } from '@/app/services/axiosDefaults';
import { getAccessToken } from '@/app/lib/actions';

import { ChangeEvent, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Modal from './Modal';

import LoginModal from './LoginModal';
import useAddLocationModal from '@/app/hooks/useAddLocationModal';
import CustomButton from '../forms/CustomButton';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';

import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import SelectAddress from '../forms/SelectAddress';

const AddLocationModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  })
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [dataImage, setDataImage] = useState<File | null>(null);

  const addLocationModal = useAddLocationModal();
  const router = useRouter();

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 ) {
      const tmpImage = event.target.files[0];

      setDataImage(tmpImage);
    }
  }

  const submitForm = async () => {
    const token = await getAccessToken();
    console.log('submit form');

    if (
      address &&
      name &&
      summary &&
      dataImage
    ) {
        const formData = new FormData();
        formData.append('address', JSON.stringify(address));
        formData.append('name', name);
        formData.append('summary', summary);
        formData.append('image', dataImage);

        try {
          const { data } = await  axiosReq.post(
            '/api/location/locations/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
          })
          console.log('SUCCESS :-D');
          console.log(data)

          router.push('/');
          setCurrentStep(1);

          addLocationModal.close();
        } catch (err) {
          console.log(err);
        }
      }
  }

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className='mb-6 text-2xl'>Location</h2>

          <SelectAddress
            address={address}
            setAddress={setAddress}
          />

          <CustomButton
              label='Next'
              onClick={() => setCurrentStep(2)}
          />
        </>

      ) : currentStep == 2 ? (
        <>
          <h2 className='mb-6 text-2xl'>Describe your place</h2>

          <div className='pt-3 pb-6 space-y-4'>
            <div className='flex flex-col space-y-2'>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-4 border border-gray-600 rounded-xl'
                />
            </div>

            <div className='flex flex-col space-y-2'>
                <label>Summary</label>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                ></textarea>
            </div>
          </div>

          <CustomButton
            label='Previous'
            className='mb-2 bg-black hover:bg-gray-800'
            onClick={() => setCurrentStep(1)}
          />

          <CustomButton
              label='Next'
              onClick={() => setCurrentStep(3)}
          />
        </>
      ) : (
        <>
          <h2 className='mb-6 text-2xl'>Image</h2>

          <div className='pt-3 pb-6 space-y-4'>
              <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                  <input
                      type="file"
                      accept='image/*'
                      onChange={setImage}
                  />
              </div>

              {dataImage && (
                  <div className='w-[200px] h-[150px] relative'>
                      <Image
                          fill
                          alt="Uploaded image"
                          src={URL.createObjectURL(dataImage)}
                          className='w-full h-full object-cover rounded-xl'
                      />
                  </div>
              )}
          </div>

          {errors.map((error, index) => {
              return (
                  <div
                      key={index}
                      className='p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80'
                  >
                      {error}
                  </div>
              )
          })}

          <CustomButton
              label='Previous'
              className='mb-2 bg-black hover:bg-gray-800'
              onClick={() => setCurrentStep(2)}
          />

          <CustomButton
              label='Submit'
              onClick={submitForm}
          />
        </>
      )}
    </>
  )

  return (
    <>
      <Modal
        isOpen={addLocationModal.isOpen}
        close={addLocationModal.close}
        label="add Location"
        content={content}
      />
    </>
  )
}

export default AddLocationModal;