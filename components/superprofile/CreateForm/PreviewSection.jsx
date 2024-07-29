import React, { useState, useRef } from 'react';
import DesktopPreviewSection from './DesktopPreviewSection';
import MobilePreviewSection from './MobilePreviewSection';
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const PreviewSection = ({ formData, setFormData, setShowPreview }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [isVisibleTermsCondition, setIsVisibleTermsCondition] = useState(false);
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

    const commanPartMainContainer = () => {
        return (
            <div className='flex flex-col gap-3'>
                <div className='flex gap-1 items-center'>
                    <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={40} height={40} className='rounded-full h-10 w-10' alt='customizePageLogo' />
                    <p className='text-xs'>{formData.customizePageTitle || 'easylifetools'}</p>
                </div>
                {formData.pagetitle &&
                    <div>
                        <p className='font-bold text-lg'>{formData.pagetitle}</p>
                    </div>
                }
                {formData.coverfiles &&
                    <div>
                        <Image src={formData.coverfiles.preview} height={200} width={200} className='rounded-md' alt='coverfiles' />
                    </div>
                }
                {formData.description &&
                    <div >
                        <p className='font-bold'>
                            Description
                        </p>
                        <div className={`mt-2 text-xs shadow border rounded p-2 `}>
                            <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                        </div>
                    </div>
                }
                <div className='shadow border rounded-lg p-2'>
                    <div className='flex items-center gap-2 '>
                        <div className='border w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs'>
                            H
                        </div>
                        <div className='text-sm'>
                            HK
                        </div>
                    </div>
                    <div className='mt-3'>
                        <a href="https://www.instagram.com/hkappsofficial" target="_blank" rel="noopener noreferrer">
                            <Image src='/images/instagram.webp' width={12} height={12} alt='instagram' />
                        </a>
                    </div>
                </div>
                {formData.faqsViewToggle && formData.faqs && <div className='mt-4'>
                    <p className='font-bold'>
                        Frequently Asked Questions (FAQs)
                    </p>
                    <Accordion type="single" collapsible>
                        {formData.faqs.map((item, i) => (
                            <AccordionItem key={i} value={'value-' + i}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>}
                {formData.testimonialsViewToggle && formData.testimonials &&
                    <div>
                        <p className='font-bold'>
                            Testimonials
                        </p>
                        <div className='px-12'>
                            <Carousel>
                                <CarouselContent>
                                    {formData.testimonials.map((testimonial, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex flex-col p-2">
                                                        <div className='text-[30px]'> ❝</div>
                                                        <span className="font-semibold text-sm -mt-5">{testimonial.name}</span>
                                                        <p className="text-base text-sm">{testimonial.comment}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                }
                {formData.supportEmail && <div>
                    <p className='cursor-pointer font-bold'>
                        Contact
                    </p>
                    <p className='mt-1'><span className='text-lg'>✉</span> &nbsp;&nbsp; {formData.supportEmail}</p>
                    <p className=''>📞 &nbsp; {formData.supportContact}</p>
                    {formData.socialLinksViewToggle && formData.socialLinks && (
                        <div className="flex mt-2">
                            {Object.entries(formData.socialLinks).map(([platform, link], index) => (
                                <a key={index} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="mx-0.5 text-gray-700 hover:text-gray-900">
                                    {renderSocialIcon(platform)}
                                </a>
                            ))}
                        </div>
                    )}
                </div>}
                <div>
                    <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold'>
                        {isVisibleTermsCondition ? '- Terms and Conditions' : '+ Terms and Conditions'}
                    </p>
                    {isVisibleTermsCondition && <p className='text-xs'>You agree to share information entered on this page with easylifetools (owner of this page) and Cosmofeed, adhering to applicable laws.</p>}
                </div>
                <div className='w-full bg-gray-200 h-0.5'></div>
                <div>
                    <p className='font-bold text-lg'>HKAPPS</p>
                    <p className='text-xs mt-1'> Want to create your own payment page? Experience hassle-free payouts and premium support. Get started now!</p>
                </div>
            </div>
        )
    }

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
                    customAmountError={customAmountError}
                    toggleVisibleTermsCondition={toggleVisibleTermsCondition}
                    commanPartMainContainer={commanPartMainContainer}
                />
                    :
                    <DesktopPreviewSection
                        commanPartMainContainer={commanPartMainContainer}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        discountPercentage={discountPercentage}
                        renderSocialIcon={renderSocialIcon}
                        customAmountError={customAmountError}
                        toggleVisibleTermsCondition={toggleVisibleTermsCondition}
                        isVisibleTermsCondition={isVisibleTermsCondition}
                    />
                }
            </div>
        </div>
    );
};

export default PreviewSection;
