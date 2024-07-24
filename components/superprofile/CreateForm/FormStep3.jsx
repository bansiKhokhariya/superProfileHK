// 'use client';

// import React, { useState, useEffect } from 'react';
// import MetaPixelModal from '@/components/modal/MetaPixelModal'; // Adjust the import path as needed

// const FormStep3 = ({ formData, setFormData, errors, onFormDataChange }) => {
//     const [isMetaPixelModalOpen, setMetaPixelModalOpen] = useState(false);

//     useEffect(() => {
//         onFormDataChange(formData);
//     }, [formData, onFormDataChange]);

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData({
//             ...formData,
//             [id]: value,
//         });
//     };

//     const handleMetaPixelSubmit = (data) => {
//         setFormData({
//             ...formData,
//             metaPixelId: data.pixelId,
//             metaEventName: data.eventName,
//         });
//     };

//     return (
//         <div className='flex flex-col gap-6'>
//             <div>
//                 <label className='font-bold mb-4'>Advanced Options</label>
//                 <div className='text-sm mt-4'>
//                     <p>Support/Contact Details</p>
//                     <p className='text-gray-500'>Provide Support Email and Phone Number for queries and issues.</p>
//                 </div>
//                 <div className="mt-4">
//                     <label htmlFor="supportEmail" className="block mb-2 text-sm font-medium">Support Email</label>
//                     <input
//                         type="text"
//                         id="supportEmail"
//                         value={formData.supportEmail ?? ''}
//                         onChange={handleInputChange}
//                         className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
//                         placeholder="Email ID"
//                     />
//                     {errors.supportEmail && <p className="text-red-500 text-sm mt-1">{errors.supportEmail}</p>}
//                 </div>
//                 <div className="mt-4">
//                     <label htmlFor="supportContact" className="block mb-2 text-sm font-medium">Support Contact</label>
//                     <input
//                         type="text"
//                         id="supportContact"
//                         value={formData.supportContact ?? ''}
//                         onChange={handleInputChange}
//                         className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
//                         placeholder="Phone Number"
//                     />
//                     {errors.supportContact && <p className="text-red-500 text-sm mt-1">{errors.supportContact}</p>}
//                 </div>
//             </div>
//             <div className='flex flex-col'>
//                 <label className='font-bold mb-4'>Tracking</label>
//                 <p
//                     role="button"
//                     className=" text-pink-500 font-bold text-sm"
//                     onClick={() => setMetaPixelModalOpen(true)}
//                 >
//                     + Add new Pixel ID
//                 </p>
//             </div>


//             {/* MetaPixelModal Component */}
//             <MetaPixelModal
//                 isOpen={isMetaPixelModalOpen}
//                 onClose={() => setMetaPixelModalOpen(false)}
//                 onSubmit={handleMetaPixelSubmit}
//             />
//         </div>
//     );
// };

// export default FormStep3;


'use client';

import React, { useState, useEffect } from 'react';
import MetaPixelModal from '@/components/modal/MetaPixelModal'; // Adjust the import path as needed

const FormStep3 = ({ formData, setFormData, errors, onFormDataChange }) => {
    const [isMetaPixelModalOpen, setMetaPixelModalOpen] = useState(false);

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

    const handleMetaPixelSubmit = (data) => {
        setFormData({
            ...formData,
            metaPixelId: data.pixelId,
            metaEventName: data.eventName,
        });
    };

    const handleDeleteMetaPixel = () => {
        setFormData({
            ...formData,
            metaPixelId: '',
            metaEventName: '',
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
                    <input
                        type="text"
                        id="supportEmail"
                        value={formData.supportEmail ?? ''}
                        onChange={handleInputChange}
                        className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
                        placeholder="Email ID"
                    />
                    {errors.supportEmail && <p className="text-red-500 text-sm mt-1">{errors.supportEmail}</p>}
                </div>
                <div className="mt-4">
                    <label htmlFor="supportContact" className="block mb-2 text-sm font-medium">Support Contact</label>
                    <input
                        type="text"
                        id="supportContact"
                        value={formData.supportContact ?? ''}
                        onChange={handleInputChange}
                        className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
                        placeholder="Phone Number"
                    />
                    {errors.supportContact && <p className="text-red-500 text-sm mt-1">{errors.supportContact}</p>}
                </div>
            </div>
            <div className='flex flex-col'>
                <label className='font-bold mb-4'>Tracking</label>
                {formData.metaPixelId ? (
                    <div className="flex items-center justify-between bg-white border px-3 py-2 rounded-lg shadow-lg">
                        <div>
                            <p className="text-sm">Pixel ID: {formData.metaPixelId}</p>
                            <p className="text-sm">Event Name: {formData.metaEventName}</p>
                        </div>
                        <button
                            type="button"
                            className="text-red-500 text-sm font-bold"
                            onClick={handleDeleteMetaPixel}
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <p
                        role="button"
                        className="text-pink-500 font-bold text-sm"
                        onClick={() => setMetaPixelModalOpen(true)}
                    >
                        + Add new Pixel ID
                    </p>
                )}
            </div>

            {/* MetaPixelModal Component */}
            <MetaPixelModal
                isOpen={isMetaPixelModalOpen}
                onClose={() => setMetaPixelModalOpen(false)}
                onSubmit={handleMetaPixelSubmit}
            />
        </div>
    );
};

export default FormStep3;
