'use client';

import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
                <div className='grid items-center gap-2 mt-4'>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input type="text" id="supportEmail" value={formData.supportEmail ?? ''} onChange={handleInputChange} placeholder="Email ID" />
                    {errors.supportEmail && <p className="text-red-500 text-sm">{errors.supportEmail}</p>}
                </div>
                <div className='grid items-center gap-2 mt-4'>
                    <Label htmlFor="supportContact">Support Contact</Label>
                    <Input type="text" id="supportContact" value={formData.supportContact ?? ''} onChange={handleInputChange} placeholder="Phone Number" />
                    {errors.supportContact && <p className="text-red-500 text-sm">{errors.supportContact}</p>}
                </div>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold mb-4'>Tracking</label>
                <div className='grid items-center gap-2 '>
                    <Label htmlFor="metaPixelId">Pixel ID</Label>
                    <Input type="text" id="metaPixelId" value={formData.metaPixelId ?? ''} onChange={handleInputChange} placeholder="Enter Pixel ID" />
                </div>
            </div>
        </div>
    );
};

export default FormStep3;
