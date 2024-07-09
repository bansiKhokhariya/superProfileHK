import React, { useState } from 'react';
import DesktopPreviewSection from './DesktopPreviewSection';
import MobilePreviewSection from './MobilePreviewSection';

const PreviewSection = ({ formData , setFormData }) => {
    const [isMobileView, setIsMobileView] = useState(false);

    const handleMobileClick = () => {
        setIsMobileView(true);
    };

    const handleDesktopClick = () => {
        setIsMobileView(false);
    };

    return (
        <div className='py-12 px-10'>
            <div className='flex justify-between gap-10 items-center'>
                <p className='text-xl font-extrabold text-white'>Preview</p>
                <div className='flex p-2 gap-2 bg-gray-50 bg-opacity-20 rounded-lg'>
                    <p
                        className={`bg-white py-1 px-1 text-sm border rounded-lg font-bold cursor-pointer ${isMobileView ? 'border-black' : ''}`}
                        onClick={handleMobileClick}
                    >
                        Mobile
                    </p>
                    <p
                        className={`bg-white py-1 px-1 text-sm border rounded-lg font-bold cursor-pointer ${!isMobileView ? 'border-black' : ''}`}
                        onClick={handleDesktopClick}
                    >
                        Desktop
                    </p>
                </div>
            </div>
            <div className='flex justify-center '>
                {isMobileView ? <MobilePreviewSection formData={formData} setFormData={setFormData} /> : <DesktopPreviewSection formData={formData} setFormData={setFormData} />}
            </div>
        </div>
    );
};

export default PreviewSection;
