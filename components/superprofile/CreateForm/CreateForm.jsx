'use client';
import React, { useState, useEffect } from 'react';
import FormSection from '@/components/superprofile/CreateForm/FormSection';
import PreviewSection from './PreviewSection';
import axios from 'axios'

const CreateForm = ({ productId }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({

    });
    const [loading, setLoading] = useState(true); // State to track loading state
    const previewBackgroundUrl = `/images/previewBackground.webp`;

    useEffect(() => {
        if (productId) {
            const fetchData = async () => {
                try {
                    const url = `/api/superProfile/DigitalPaymentProduct/getById/${productId}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setFormData(data.product);
                    setLoading(false); // Set loading to false after data is fetched
                } catch (error) {
                    console.error('Error fetching product data:', error);
                    setLoading(false); // Handle error by setting loading to false
                }
            };
            fetchData();
        }
    }, [productId]);

    useEffect(() => {
        if (!formData.theme) {
            setFormData(prevState => ({
                ...prevState,
                theme: 'light'
            }));
        }
        if (!formData.customizePageLogo) {
            setFormData(prevState => ({
                ...prevState,
                customizePageLogo: '/images/mainLogo.webp'
            }));
        }
        if (!formData.customizePageTitle) {
            setFormData(prevState => ({
                ...prevState,
                customizePageTitle: 'easylifetools'
            }));
        }
        if (!formData.color) {
            setFormData(prevState => ({
                ...prevState,
                color: 'rgb(122, 88, 169)'
            }));
        }
    }, [formData, setFormData]);

    return (
        <div className='flex items-center flex-col lg:flex-row'>
            {productId && loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className={`bg-white w-full lg:w-1/2  ${showPreview ? 'hidden lg:block' : ''}`} style={{ height: "100vh" }}>
                        <FormSection productId={productId} showPreview={showPreview} setShowPreview={setShowPreview} formData={formData} setFormData={setFormData} />
                    </div>
                    <div className={`relative flex justify-center w-full ${!showPreview ? 'hidden lg:flex' : ''}`} style={{ height: "100vh" }}>
                        <div
                            className='absolute inset-0 bg-cover bg-center'
                            style={{ backgroundImage: `url(${previewBackgroundUrl})` }}
                        ></div>
                        <div className='relative z-10 w-full'>
                            <PreviewSection formData={formData} setFormData={setFormData} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateForm;
