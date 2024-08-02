import React, { useState } from 'react';
import Link from 'next/link';
import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'
import FormStep3 from './FormStep3'
import FormStep4 from './FormStep4'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const FormSection = ({ showPreview, setShowPreview, formData, setFormData, productId }) => {
  const router = useRouter();

  const [errors, setErrors] = useState({})
  const [stepPage, setStepPage] = useState(1); // Track the current step

  const handleFormDataChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleSaveAndContinue = () => {
    let newErrors = {};

    if (formData.digitalFiles) {
      if (formData.digitalFiles.length == 0) {
        newErrors.digitalFiles = 'Digital files are required';
      }
    } else {
      newErrors.digitalFiles = 'Digital files are required';
    }
    if (formData.pricingType === 'FixedPrice' && !formData.priceInput) {
      newErrors.priceInput = 'Price is required';
    }
    if (formData.offerDiscountCheckbox && !formData.offerDiscountInput) {
      newErrors.offerDiscountInput = 'Discounted price is required';
    }
    if (formData.pricingType === 'CustomersDecidePrice' && !formData.minimunInput) {
      newErrors.minimunInput = 'Minimum price is required';
    }
    if (formData.suggestPriceCheckbox && !formData.suggestPriceInput) {
      newErrors.suggestPriceInput = 'Suggested price is required';
    }

    if (stepPage == 2) {
      if (!formData.pagetitle) {
        newErrors.pagetitle = 'Page title is required';
      }
      if (!formData.description) {
        newErrors.description = 'Description is required';
      }
    }

    if (stepPage === 3) {
      let newErrors = {};

      // Validate support email
      if (!formData.supportEmail) {
        newErrors.supportEmail = 'Support email is required';
      } else {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.supportEmail)) {
          newErrors.supportEmail = 'Invalid email format';
        }
      }

      // Validate support contact
      if (!formData.supportContact) {
        newErrors.supportContact = 'Support phone number is required';
      }

      // Set the errors state with the new errors object
      setErrors(newErrors);

      // Check if there are no errors
      const isValid = Object.keys(newErrors).length === 0;

      if (isValid) {
        // Proceed with form submission or next step
      }
    }

    if (Object.keys(newErrors).length === 0) {
      if (stepPage != 4) {
        setStepPage(stepPage + 1);
      } else {
        // Handle final submission
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleBackPage = () => {
    if (stepPage == 4) {
      setStepPage(3);
    }
    if (stepPage == 3) {
      setStepPage(2);
    }
    if (stepPage == 2) {
      setStepPage(1);
    }
    setErrors({});
  }

  const handlePublishChanges = async () => {

    try {
      const response = await fetch('/api/superProfile/DigitalPaymentProduct/Createupdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await response.json();
        router.push(`/app/payment-page`);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
  };

  const handleEditPageStep = (number) => {
    setStepPage(number);
  };

  return (
    <>
      <div className={`sticky top-0 border-b px-4 pt-4 bg-white flex flex-col   ${!productId && 'pb-4'} `}>
        <div className=' flex justify-between items-center'>
          <div>
            <Link href={'/app/payment-page'}><b>✕</b></Link>  &nbsp;  | &nbsp; New Checkout Page
          </div>
          <Button size='sm' className='block lg:hidden' onClick={handlePreviewClick}>Preview</Button>
        </div>
        {productId && <div className='flex ml-8 mt-4 gap-4 text-sm text-gray-500'>
          <button className={stepPage === 1 ? 'border-b border-gray-900' : ''} onClick={() => handleEditPageStep(1)}>Product</button>
          <button className={stepPage === 2 ? 'border-b border-gray-900' : ''} onClick={() => handleEditPageStep(2)}>Details</button>
          <button className={stepPage === 3 ? 'border-b border-gray-900' : ''} onClick={() => handleEditPageStep(3)}>Settings</button>
          <button className={stepPage === 4 ? 'border-b border-gray-900' : ''} onClick={() => handleEditPageStep(4)}>Customise</button>
        </div>}
      </div>

      <div className='p-8 flex flex-col gap-4 bg-white overflow-y-scroll ' style={{ height: "85dvh" }}>
        <p className='text-gray-500 text-sm'>Step {stepPage} of 4</p>
        {stepPage === 1 && <FormStep1 formData={formData} setErrors={setErrors} setFormData={setFormData} errors={errors} onFormDataChange={handleFormDataChange} />}
        {stepPage === 2 && <FormStep2 formData={formData} setFormData={setFormData} errors={errors} onFormDataChange={handleFormDataChange} />}
        {stepPage === 3 && <FormStep3 formData={formData} setFormData={setFormData} errors={errors} onFormDataChange={handleFormDataChange} />}
        {stepPage === 4 && <FormStep4 formData={formData} setFormData={setFormData} errors={errors} onFormDataChange={handleFormDataChange} />}
      </div>
      {productId ?
        <div className='absolute bg-white sticky bottom-0 border-t p-4 text-end'>
          <button className='bg-black text-white py-2 px-4 rounded-full text-sm' onClick={handlePublishChanges}>Publish Changes</button>
        </div>
        :
        <div className='absolute bg-white sticky bottom-0 border-t p-4 text-end'>
          {stepPage != 1 && <Button size='sm' variant='outline' className='mr-2' onClick={handleBackPage}>⇐ Back</Button>}
          {stepPage == 4 && <Button size='sm' onClick={handlePublishChanges}>Publish Changes</Button>}
          {stepPage != 4 && <Button size='sm' onClick={handleSaveAndContinue}>Save and Continue</Button>}
        </div>
      }
    </>
  )
}

export default FormSection