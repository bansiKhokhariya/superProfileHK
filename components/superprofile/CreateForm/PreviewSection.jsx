import React, { useState, useRef } from 'react';
import DesktopPreviewSection from './DesktopPreviewSection';
import MobilePreviewSection from './MobilePreviewSection';
import Image from 'next/image'

const PreviewSection = ({ formData, setFormData, setShowPreview }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [isVisibleTermsCondition, setIsVisibleTermsCondition] = useState(false);
    const [current, setCurrent] = useState(0);
    const [customAmountError, setCustomAmountError] = useState('');

    const handleMobileClick = () => {
        setIsMobileView(true);
    };

    const handleDesktopClick = () => {
        setIsMobileView(false);
    };

    const toggleVisibleTermsCondition = () => {
        setIsVisibleTermsCondition(!isVisibleTermsCondition);
    };

    const FaqItem = ({ item }) => {
        const accordion = useRef(null);
        const [isOpen, setIsOpen] = useState(false);

        return (
            <li>
                <button
                    className="flex flex-col gap-1 w-full px-2 pt-1 border rounded"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                    aria-expanded={isOpen}
                >
                    <div className='flex items-center justify-between w-full'>
                        <span
                            className={`text-[8px] font-bold`}
                        >
                            {item?.question}
                        </span>
                        <svg
                            className={`flex-shrink-0 w-2 h-2 ml-auto fill-current`}
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${isOpen && "rotate-180"
                                    }`}
                            />
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen && "rotate-180 hidden"
                                    }`}
                            />
                        </svg>
                    </div>
                    <div
                        ref={accordion}
                        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                        style={
                            isOpen
                                ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
                                : { maxHeight: 0, opacity: 0 }
                        }
                    >
                        <div className="text-left text-[8px]">{item?.answer}</div>
                    </div>

                </button>
            </li>
        );
    };

    const testimonials = formData.testimonials;

    const handlePrev = () => {
        setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    };

    const handleNext = () => {
        setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    };

    const renderSocialIcon = (platform) => {
        switch (platform) {
            case 'facebook':
                return <Image src='/svg/facebook.svg' width={14} height={14} className='rounded' alt='facebook' />;
            case 'twitter':
                return <Image src='/svg/twitter.svg' width={14} height={14} className='rounded' alt='twitter' />;
            case 'instagram':
                return <Image src='/svg/instagram.svg' width={14} height={14} className='rounded' alt='instagram' />;
            case 'linkedin':
                return <Image src='/svg/linkedin.svg' width={14} height={14} className='rounded' alt='linkedin' />;
            case 'youtube':
                return <Image src='/svg/youtube.svg' width={14} height={14} className='rounded' alt='youtube' />;
            case 'threads':
                return <Image src='/svg/threads.svg' width={14} height={14} className='rounded' alt='threads' />;
            case 'behance':
                return <Image src='/svg/behance.svg' width={14} height={14} className='rounded' alt='behance' />;
            case 'dribbble':
                return <Image src='/svg/dribbble.svg' width={14} height={14} className='rounded' alt='dribbble' />;
            case 'whatsapp':
                return <Image src='/svg/whatsapp.svg' width={14} height={14} className='rounded' alt='whatsapp' />;
            default:
                return null; // Add more cases as needed
        }
    };

    const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
        if (originalPrice && discountedPrice) {
            const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
            return Math.floor(discount); // Returns an integer value
        }
        return null;
    };

    const originalPrice = parseFloat(formData.priceInput);
    const discountedPrice = parseFloat(formData.offerDiscountInput);
    const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        if (formData.customAmount < formData.minimunInput) {
            setCustomAmountError(`Amount should be more than ${formData.minimunInput}`)
        } else {
            setCustomAmountError(``)
        }
    };

    return (
        <div className='py-12 px-10'>
            <div className='flex justify-between gap-10 items-center mb-4'>
                <p className='text-xl font-extrabold text-white hidden lg:block'>Preview</p>
                <button className='text-xl font-extrabold text-white block lg:hidden' onClick={() => setShowPreview(false)}>✖</button>
                <div className='flex p-1 gap-1 bg-gray-50 bg-opacity-20 rounded'>
                    <p
                        className={`py-0.5 px-1 text-xs border rounded font-bold cursor-pointer ${isMobileView ? 'border-gray text-white bg-gray-500 ' : 'bg-white text-black'}`}
                        onClick={handleMobileClick}
                    >
                        Mobile
                    </p>
                    <p
                        className={`py-0.5 px-1 text-xs border rounded font-bold cursor-pointer ${!isMobileView ? 'border-gray text-white bg-gray-500 ' : 'bg-white text-black'}`}
                        onClick={handleDesktopClick}
                    >
                        Desktop
                    </p>
                </div>
            </div>
            <div className='flex justify-center '>
                {isMobileView ? <MobilePreviewSection
                    formData={formData}
                    handleInputChange={handleInputChange}
                    discountPercentage={discountPercentage}
                    renderSocialIcon={renderSocialIcon}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    customAmountError={customAmountError}
                    FaqItem={FaqItem}
                    toggleVisibleTermsCondition={toggleVisibleTermsCondition}
                    isVisibleTermsCondition={isVisibleTermsCondition}
                    testimonials={testimonials}
                    current={current} />
                    :
                    <DesktopPreviewSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        discountPercentage={discountPercentage}
                        renderSocialIcon={renderSocialIcon}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        customAmountError={customAmountError}
                        FaqItem={FaqItem}
                        toggleVisibleTermsCondition={toggleVisibleTermsCondition}
                        isVisibleTermsCondition={isVisibleTermsCondition}
                        testimonials={testimonials}
                        current={current}
                    />
                }
            </div>
        </div>
    );
};

export default PreviewSection;
