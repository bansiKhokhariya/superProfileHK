
import React, { useState } from 'react';

const FaqTestimonialModal = ({ showModal, handleClose, formData, formFields, handleInputChange, handleFormSubmit, title }) => {
  const [errors, setErrors] = useState({});

  if (!showModal) return null;

  const validate = () => {
    const newErrors = {};
    formFields.forEach((field) => {
      if (!formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      handleFormSubmit();
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-200 z-50 flex justify-center items-center'>
      <div className='w-full max-w-2xl max-h-full bg-white shadow-lg p-4 rounded-md'>
        <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
          <h2 className='text-gray-900 font-bold mb-4'>{title}</h2>
          <button
            type='button'
            className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
        <form className='mt-4'>
          {formFields.map((field) => (
            <div className="mb-4" key={field.id}>
              <label htmlFor={field.id} className="block mb-2 text-sm font-medium">
                {field.label}
              </label>
              {field.type === 'text' && (
                <input type="text"
                  id={field.id}
                  value={formData[field.id]}
                  onChange={(e) => handleInputChange(e, field.id)}
                  className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" />
              )}
              {field.type === 'textarea' && (
                <textarea
                  id={field.id}
                  value={formData[field.id]}
                  onChange={(e) => handleInputChange(e, field.id)}
                  className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
                />
              )}
              {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
            </div>
          ))}
        </form>
        <button
          type='button'
          className='h-8 px-2 mt-4 text-sm rounded-md bg-gray-700 text-white'
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FaqTestimonialModal;



