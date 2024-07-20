import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import Image from 'next/image'

const FormStep4 = ({ formData, setFormData, onFormDataChange }) => {
    const [color, setColor] = useState(formData.color || '#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);


    useEffect(() => {
        onFormDataChange(formData);
    }, [formData, onFormDataChange]);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        // Handle different input types
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [id]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    const handleFileChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);

        uploadedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    customizePageLogo: {
                        name: file.name,
                        type: file.type,
                        preview: reader.result, // Save preview URL if needed
                    },
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleTheme = (type) => {
        setFormData({
            ...formData,
            theme: type,
        });
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        setFormData({
            ...formData,
            color: color.hex,
        });
    };

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <label className='font-bold mb-4'>Customize your page</label>
                <div className='flex flex-col gap-4 mt-4'>
                    <div className='flex items-center gap-4'>
                        <Image src={formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={80} height={80} className='rounded-full h-20 w-20' alt="logo" />
                        <label htmlFor="customizePageLogo" className="cursor-pointer">
                            <p className="py-1 px-3 border hover:bg-pink-500 hover:text-white rounded-full">Change</p>
                            <input id="customizePageLogo" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="customizePageTitle" className="block mb-2 text-sm font-medium">Page owner</label>
                        <input
                            type="text"
                            id="customizePageTitle"
                            value={formData.customizePageTitle ?? 'easylifetools'}
                            onChange={handleInputChange}
                            className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5"
                            placeholder="Email ID"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full bg-gray-200 h-1'></div>
            <div>
                <label className='font-bold mb-4'>Select Template</label>
                <div className='flex gap-3 mt-4'>
                    <div
                        className={`border ${formData.theme === 'light' ? 'border-pink-500' : ''} p-2`}
                        onClick={() => handleTheme('light')}
                    >
                        <Image src='/svg/lightThemePicure.svg' width={200} height={200} alt="light theme" />
                        <p className={`text-center text-sm mt-1 ${formData.theme === 'light' ? 'text-pink-500' : ''}`}>
                            Light (Default)
                        </p>
                    </div>
                    <div
                        className={`border ${formData.theme === 'dark' ? 'border-pink-500' : ''} p-2`}
                        onClick={() => handleTheme('dark')}
                    >
                        <Image src='/svg/darkThemePicure.svg' width={200} height={200} alt="dark theme" />
                        <p className={`text-center text-sm mt-1 ${formData.theme === 'dark' ? 'text-pink-500' : ''}`}>
                            Dark
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="colorPicker" className="block mb-2 text-sm font-medium">Color</label>
                    <div className="flex items-center gap-2">
                        <div
                            style={{
                                backgroundColor: color,
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                        ></div>
                        <button
                            className="py-1 px-3 border hover:bg-pink-500 hover:text-white text-sm rounded-md"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                        >
                            {showColorPicker ? 'Close Color Picker' : 'Open Color Picker'}
                        </button>
                    </div>
                    {showColorPicker && (
                        <div style={{ position: 'absolute', zIndex: '2' }}>
                            <SketchPicker
                                color={color}
                                onChange={handleColorChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full bg-gray-200 h-1'></div>
            <div>
                <div className="flex items-center">
                    <input
                        id="isDraft"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded"
                        checked={formData.isDraft ?? ''}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="isDraft" className="py-3 ms-2 text-sm">I have read and agree to the Terms and Conditions and Privacy Policy of SuperProfile</label>
                </div>
            </div>
        </div>
    );
};

export default FormStep4;
