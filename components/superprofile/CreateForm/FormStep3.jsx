'use client';
import React, { useEffect } from 'react'

const FormStep3 = ({ formData, setFormData, errors, onFormDataChange }) => {

    useEffect(() => {
        onFormDataChange(formData);
    }, [formData, onFormDataChange]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <label className='font-bold mb-4'>Advanced Options</label>
                <div className='text-sm mt-4'>
                    <p>Support/Contact Details</p>
                    <p className='text-gray-500'>Provide Support Email and Phone Number for queries and issues.</p>
                </div>
                <div className="mt-4">
                    <label htmlFor="supportEmail" className="block mb-2 text-sm font-medium">Support Email</label>
                    <input type="text" id="supportEmail" value={formData.supportEmail ?? ''} onChange={handleInputChange} className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" placeholder="Email ID" />
                    {errors.supportEmail && <p className="text-red-500 text-sm mt-1">{errors.supportEmail}</p>}
                </div>
                <div className="mt-4">
                    <label htmlFor="supportContact" className="block mb-2 text-sm font-medium">Support Contact</label>
                    <input type="text" id="supportContact" value={formData.supportContact ?? ''} onChange={handleInputChange} className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" placeholder="Phone Number" />
                    {errors.supportContact && <p className="text-red-500 text-sm mt-1">{errors.supportContact}</p>}
                </div>
            </div>
        </div>
    )
}

export default FormStep3