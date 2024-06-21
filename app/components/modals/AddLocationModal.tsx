'use client'

import Image from 'next/image';
import { axiosReq } from '@/app/services/axiosDefaults';
import { getAccessToken } from '@/app/lib/actions';

import { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Modal from './Modal';

import LoginModal from './LoginModal';
import useAddLocationModal from '@/app/hooks/useAddLocationModal';
import CustomButton from '../forms/CustomButton';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';

import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';

const AddLocationModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const addLocationModal = useAddLocationModal();
  const router = useRouter();

  const submitForm = async () => {
    const token = await getAccessToken();
    console.log('submit form');

    if (
      country &&
      region &&
      name &&
      summary
    ) {
        const formData = new FormData();
        formData.append('country', country);
        formData.append('region', region);
        formData.append('name', name);
        formData.append('summary', summary);

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

        // const response = await apiService.post('/api/location/locations/', formData);
        // console.log(response);

        // if (response.success) {
        //   console.log('SUCCESS :-D');

        //   router.push('/');

        //   addLocationModal.close();
        // } else {
        //   console.log('Error');

        //   const tmpErrors: string[] = Object.values(response).map((error: any) => {
        //     return error;
        //   })

        //   setErrors(tmpErrors)

        // }
      }
  }

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className='mb-6 text-2xl'>Location</h2>

          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            whitelist={['GB']}
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
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