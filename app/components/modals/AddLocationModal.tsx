'use client'

import Image from 'next/image';

import { useState } from 'react';
import Modal from './Modal';

import LoginModal from './LoginModal';
import useAddLocationModal from '@/app/hooks/useAddLocationModal';
import CustomButton from '../forms/CustomButton';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';

const AddLocationModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();

  const addLocationModal = useAddLocationModal();

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className='mb-6 text-2xl'>Location</h2>

          <SelectCountry
            value={dataCountry}
            onChange={(value) => setDataCountry(value as SelectCountryValue)}
          />

          <CustomButton
              label='Next'
              onClick={() => setCurrentStep(2)}
          />
        </>

      ) : (
        <>
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