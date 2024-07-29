'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import isUrl from 'is-url';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const FormStep1 = ({ errors, formData, setFormData, onFormDataChange, setErrors }) => {

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);

    useEffect(() => {
        onFormDataChange(formData);
    }, [formData, onFormDataChange]);

    useEffect(() => {
        if (!formData.pricingType) {
            setFormData(prevState => ({
                ...prevState,
                pricingType: 'FixedPrice'
            }));
        }
    }, [formData, setFormData]);

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

        const updatedErrors = { ...errors };

        if (id === 'offerDiscountInput') {
            const originalPrice = parseFloat(formData.priceInput);
            const discountedPrice = parseFloat(value);
            if (discountedPrice >= originalPrice) {
                updatedErrors.offerDiscountInput = 'Discounted price should be less than price';
            } else {
                delete updatedErrors.offerDiscountInput;
            }
        }

        if (id === 'priceInput' && formData.offerDiscountCheckbox) {
            const discountedPrice = parseFloat(formData.offerDiscountInput);
            const originalPrice = parseFloat(value);
            if (discountedPrice >= originalPrice) {
                updatedErrors.offerDiscountInput = 'Discounted price should be less than price';
            } else {
                delete updatedErrors.offerDiscountInput;
            }
        }

        if (id === 'suggestPriceInput' && formData.suggestPriceCheckbox) {
            const minimumPrice = parseFloat(formData.minimunInput);
            const suggestedPrice = parseFloat(value);
            if (suggestedPrice < minimumPrice) {
                updatedErrors.suggestPriceInput = 'Suggested price cannot be less than minimum price';
            } else {
                delete updatedErrors.suggestPriceInput;
            }
        }

        if (id === 'minimunInput' && formData.suggestPriceCheckbox) {
            const discountedPrice = parseFloat(formData.suggestPriceInput);
            const originalPrice = parseFloat(value);
            if (discountedPrice < originalPrice) {
                updatedErrors.suggestPriceInput = 'Suggested price cannot be less than minimum price';
            } else {
                delete updatedErrors.suggestPriceInput;
            }
        }

        setErrors(updatedErrors);

    };

    const handleFileChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);

        uploadedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    digitalFiles: [
                        ...(prevFormData.digitalFiles || []), // Handle initial state when digitalFiles is undefined
                        {
                            name: file.name,
                            type: file.type,
                            preview: reader.result,
                        },
                    ],
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleLinkChange = (e) => {
        const newLink = e.target.value;
        setLink(newLink);
        if (linkError) {
            validateLink(newLink);
        }
    };

    const validateLink = (url) => {
        if (!isUrl(url)) {
            setLinkError('Enter a valid link');
        } else {
            setLinkError('');
        }
    };

    const handleAddLink = () => {
        if (!link) {
            setLinkError('Enter a link to add');
        } else {
            validateLink(link);
            if (!linkError && link) {
                const updatedFiles = formData.digitalFiles ? [...formData.digitalFiles, link] : [link];
                setFormData({
                    ...formData,
                    digitalFiles: updatedFiles,
                });
                setLink('');
                setLinkError('');
            }
        }
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = formData.digitalFiles.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            digitalFiles: updatedFiles,
        });
    };

    const handlePricingType = (type) => {
        setFormData({
            ...formData,
            pricingType: type,
        });
    };

    return (
        <div className='flex flex-col gap-6'>
            {/******************************  upload section ****************************/}
            <div>
                <label className='font-bold '>Upload your Digital Files</label>
                <div className='border-dashed border-2 border-light-blue-500 p-4 mt-4'>
                    <label htmlFor="digitalFiles" className="flex flex-col items-center justify-center w-full cursor-pointer ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm "><span className="text-indigo-500">Browse </span> files from your system</p>
                        </div>
                        <input id="digitalFiles" type="file" className="hidden" multiple onChange={handleFileChange} />
                    </label>
                    <div className='text-xs text-gray-500 text-center'>OR</div>
                    <div className='mt-3 grid items-center gap-2'>
                        <Label htmlFor="customAmount">Add Link</Label>
                        <div className='flex '>
                            <Input type="text" value={link} onChange={handleLinkChange} placeholder="Add link to your files" />
                            <Button className='rounded-r-lg'>Add</Button>
                        </div>
                        {linkError && <p className='text-sm text-red-500'>{linkError}</p>}
                    </div>
                </div>
                {errors.digitalFiles && <p className="text-red-500 text-sm mt-1">{errors.digitalFiles}</p>}
                {formData && formData.digitalFiles && formData.digitalFiles.length != 0 ? <div className="mt-4 overflow-x-auto">
                    <h2 className="text-sm">Uploads:</h2>
                    {formData.digitalFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between gap-1 p-1 rounded-lg mt-2">
                            <div className='flex gap-2 items-center'>
                                <div className='bg-gray-100  rounded-lg p-2 w-auto'>
                                    {typeof file === 'string' ? <Image src="/images/linkDefaultImage.webp" width={24} height={24} alt="LInk icon" />
                                        : <Image src="/images/defaultImage.webp" width={24} height={24} alt="File icon" />}
                                </div>
                                <span className="text-gray-800 text-sm">{typeof file === 'string' ? file : file.name}</span>
                            </div>
                            <button onClick={() => handleDeleteFile(index)} className="text-red-500">
                                <Image src="/svg/delete.svg" width={24} height={24} alt="Delete svg" />
                            </button>
                        </div>
                    ))}
                </div> : null}
            </div>
            <div className='w-full bg-gray-200 h-1'></div>
            {/******************************  Set Pricing ****************************/}
            <div>
                <label className="font-bold">Set Pricing</label>
                <div className="flex mt-4 justify-between gap-2">
                    <div className={`border ${formData.pricingType == 'FixedPrice' && 'border-indigo-500'}  rounded-md p-6`} onClick={() => handlePricingType('FixedPrice')}>
                        <div className="flex justify-between gap-2">
                            <p className="font-bold text-sm">Fixed Price</p>
                            {formData.pricingType == 'FixedPrice' ? <div className="bg-indigo-500 px-1.5 text-white rounded-full h-full"> ✓ </div> : <div className="bg-white px-1.5 text-white border rounded-full h-full">✓</div>}
                        </div>
                        <p className="mt-2 text-sm">Charge a one-time fixed pay</p>
                    </div>
                    <div className={`border ${formData.pricingType == 'CustomersDecidePrice' && 'border-indigo-500'}  rounded-md p-6`} onClick={() => handlePricingType('CustomersDecidePrice')}>
                        <div className="flex justify-between gap-2">
                            <p className="font-bold text-sm">Customers decide price</p>
                            {formData.pricingType == 'CustomersDecidePrice' ? <div className="bg-indigo-500 px-1.5 text-white rounded-full h-full"> ✓ </div> : <div className="bg-white px-1.5 text-white border rounded-full h-full">✓</div>}
                        </div>
                        <p className="mt-2 text-sm">Let customers pay any price</p>
                    </div>
                </div>
                {/* Fixed Price */}
                {formData.pricingType == 'FixedPrice' && <div>
                    <div className='grid items-center gap-2 mt-4'>
                        <Label htmlFor="customAmount">Price</Label>
                        <Input type="number" id="priceInput" value={formData.priceInput ?? ''} onChange={handleInputChange} placeholder="₹ &nbsp; 1" />
                        {errors.priceInput && <p className="text-red-500 text-sm">{errors.priceInput}</p>}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <input
                                id="offerDiscountCheckbox"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded"
                                checked={formData.offerDiscountCheckbox ?? ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="offerDiscountCheckbox" className="py-3 ms-2 text-sm">Offer discounted price &#128712;</label>
                        </div>
                        {formData.offerDiscountCheckbox && (
                            <div className='grid items-center gap-2'>
                                <Input type="number" onChange={handleInputChange} id="offerDiscountInput" value={formData.offerDiscountInput ?? ''} placeholder="₹ &nbsp; 1" />
                                {errors.offerDiscountInput && <p className="text-red-500 text-sm">{errors.offerDiscountInput}</p>}
                            </div>
                        )}
                    </div>
                </div>}
                {/* Customers decide price */}
                {formData.pricingType == 'CustomersDecidePrice' && <div>
                    <div className='grid items-center gap-2 mt-4'>
                        <Label htmlFor="minimunInput">Minimum Price</Label>
                        <Input type="number" id="minimunInput" value={formData.minimunInput ?? ''} onChange={handleInputChange} placeholder="₹ &nbsp; 1" />
                        {errors.minimunInput && <p className="text-red-500 text-sm">{errors.minimunInput}</p>}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <input
                                id="suggestPriceCheckbox"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded"
                                checked={formData.suggestPriceCheckbox ?? ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="suggestPriceCheckbox" className="py-3 ms-2 text-sm">Want to suggest a price? &#128712;</label>
                        </div>
                        {formData.suggestPriceCheckbox && (
                            <div className='grid items-center gap-2'>
                                <Input type="number" onChange={handleInputChange} value={formData.suggestPriceInput ?? ''} id="suggestPriceInput" placeholder="₹ &nbsp; 1" />
                                {errors.suggestPriceInput && <p className="text-red-500 text-sm">{errors.suggestPriceInput}</p>}
                            </div>
                        )}
                    </div>
                </div>}
            </div>
            <div className='w-full bg-gray-200 h-1'></div>
            {/******************************  Limit Quantity  ****************************/}
            <div>
                <label className="font-bold ">Limit Quantity</label>
                <div className='mt-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm'>Limit total number of purchases?</p>
                        <label className="switch">
                            <input type="checkbox" className='customToggle' id='limitQuantityCheckBox' checked={formData.limitQuantityCheckBox ?? ''}
                                onChange={handleInputChange} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {formData.limitQuantityCheckBox && (
                        <>
                            <Input className='mt-2' type="number" id="limitQuantityInput" value={formData.limitQuantityInput ?? ''} onChange={handleInputChange} placeholder="0" />
                            <p className='text-gray-400 text-sm mt-1'>Set a maximum limit on total stock available</p>
                        </>
                    )}
                </div>
            </div>
            <div className='w-full bg-gray-200 h-1'></div>
            {/******************************   Set Product Policy  ****************************/}
            <div>
                <label className="font-bold ">Set Product Policy</label>
                <div className='mt-4'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-sm'>Do you have a refund policy? &#128712; </p>
                            <p className='text-gray-500 text-xs'>Refund policy will be shown to the customers</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" className='customToggle' id='productPolicyToggle' checked={formData.productPolicyToggle ?? ''}
                                onChange={handleInputChange} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {formData.productPolicyToggle && (
                        <>
                            <textarea id="productPolicyTextArea" value={formData.productPolicyTextArea ?? ''} onChange={handleInputChange} className="mt-4 border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-2.5" placeholder="Enter your refund policy" />
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <input
                                        id="productPolicyCheckbox"
                                        type="checkbox"
                                        className="w-4 h-4 border-gray-300 rounded"
                                        checked={formData.productPolicyCheckbox ?? ''}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="offer-discount-checkbox" className="py-3 ms-2 text-sm">I have a max. time period for customers to raise refund requests</label>
                                </div>
                                {formData.productPolicyCheckbox && (
                                    <>
                                        <div className='flex gap-2'>
                                            <Input className='mt-2' type="number" id="timePeriodInput" value={formData.timePeriodInput ?? ''} onChange={handleInputChange} placeholder="0" />
                                            <select onChange={handleInputChange} value={formData.timePeriodSelect ?? ''} id="timePeriodSelect" className="text-sm bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-indigo-500 block w-full px-2">
                                                <option value="hours">Hours</option>
                                                <option value="days">Days</option>
                                                <option value="months">Months</option>
                                            </select>
                                        </div>
                                        <p className='text-gray-400 text-sm mt-1'>This information will be shown to your customer on the checkout page</p>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FormStep1