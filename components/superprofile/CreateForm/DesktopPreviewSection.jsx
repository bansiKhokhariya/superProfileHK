'use client';
import React, { useState, useRef } from 'react'
import Image from 'next/image'

const DesktopPreviewSection = ({ formData, setFormData }) => {

    const [isVisibleTermsCondition, setIsVisibleTermsCondition] = useState(false);
    const [current, setCurrent] = useState(0);
    const [customAmountError, setCustomAmountError] = useState('');

    // Function to toggle visibility
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
            return discount.toFixed(2); // Returns a string with 2 decimal places
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
        <div className='bg-black rounded-lg shadow-lg desktop-preview-container w-[600px] h-[548px] md:w-[732px]'>
            <div className='px-2 py-1 flex items-center justify-between'>
                <div className='flex gap-2'>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                </div>
                <div className='bg-gray-200 px-10 py-1 bg-opacity-20 rounded-md'>
                    <p className='text-xs text-white'>cosmofeed.com/checkoutpages</p>
                </div>
                <div></div>
            </div>
            <div className={`flex mx-2 w-[720px] bansi ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`} >
                <div className={`rounded-bl-lg  ${formData.theme == 'light' ? 'bg-white' : 'bg-black'}`}  >
                    <div className='ml-20 mr-40 mt-8 '>
                        <div>
                            <div className='flex gap-1 items-center'>
                                <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={30} height={30} className='rounded-full h-8 w-8' alt='customizePageLogo' />
                                <p className='text-xs'>{formData.customizePageTitle || 'easylifetools'}</p>
                            </div>
                            {formData.pagetitle &&
                                <div className='mt-4'>
                                    <p className='font-bold text-sm'>{formData.pagetitle}</p>
                                    {formData.coverfiles &&
                                        <div className='mt-2'>
                                            <Image src={formData.coverfiles.preview} height={200} width={200} className='rounded-md h-40' alt='coverfiles' />
                                        </div>
                                    }
                                </div>
                            }
                            {formData.description &&
                                <>
                                    <p className='font-bold mt-4 text-[8px]'>
                                        Description
                                    </p>
                                    <div className='mt-1 text-xs border rounded p-2'>
                                        <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                                    </div>
                                </>
                            }
                            <div className='border rounded-lg p-2 mt-4'>
                                <div className='flex items-center gap-2 '>
                                    <div className='border w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs'>
                                        H
                                    </div>
                                    <div className='text-[8px]'>
                                        HK
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <a href="https://www.instagram.com/hkappsofficial" target="_blank" rel="noopener noreferrer">
                                        <Image src='/images/instagram.webp' width={10} height={10} alt='instagram' />
                                    </a>
                                </div>
                            </div>

                            {formData.faqsViewToggle && formData.faqs && <div className='mt-4'>
                                <p className='font-bold text-[8px]'>
                                    Frequently Asked Questions (FAQs)
                                </p>
                                <ul className="flex flex-col gap-1 mt-1">
                                    {formData.faqs.map((item, i) => (
                                        <FaqItem key={i} item={item} />
                                    ))}
                                </ul>
                            </div>}

                            {formData.testimonialsViewToggle && formData.testimonials &&
                                <>
                                    <p className='font-bold mt-4 text-[8px]'>
                                        Testimonials
                                    </p>
                                    <div className="border px-2 py-1 rounded">

                                        <p className="text-[8px] font-bold">{testimonials[current].name}</p>
                                        <p className="text-[8px] ">{testimonials[current].comment}</p>
                                        <div className="flex mt-2">
                                            <button
                                                onClick={handlePrev}
                                                className="text-[8px]"
                                            >
                                                ◀️
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="text-[8px]"
                                            >
                                                ▶️
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }

                            {formData.supportEmail && <div className='mt-4'>
                                <p className='cursor-pointer font-bold text-[8px]'>
                                    Contact easylifetools
                                </p>
                                <p className='text-[6px] mt-1'><span className='text-[8px]'>✉</span> &nbsp; {formData.supportEmail}</p>
                                <p className='text-[6px]'>📞 &nbsp; {formData.supportContact}</p>
                            </div>}

                            {formData.socialLinksViewToggle && formData.socialLinks && (
                                <div className="flex mt-2">
                                    {Object.entries(formData.socialLinks).map(([platform, link], index) => (
                                        <a key={index} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="mx-0.5 text-gray-700 hover:text-gray-900">
                                            {renderSocialIcon(platform)}
                                        </a>
                                    ))}
                                </div>
                            )}

                            <div className='mt-4'>
                                <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold  text-[8px]'>
                                    {isVisibleTermsCondition ? '- Terms and Conditions' : '+ Terms and Conditions'}
                                </p>
                                {isVisibleTermsCondition && <p className='text-[8px]'>You agree to share information entered on this page with easylifetools (owner of this page) and Cosmofeed, adhering to applicable laws.</p>}
                            </div>
                            <div className='w-full bg-gray-200 h-0.5 mt-6'></div>
                            <div className='mt-3'>
                                <Image src='https://superprofile.bio/_next/static/media/SuperProfile-dark.fc38e89a.svg' width={80} height={40} alt='superbaseprofile' />
                                <p className='text-[8px] mt-1'> Want to create your own payment page? Experience hassle-free payouts and premium support. Get started now!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/2' style={{ background: formData.color, height: '100dvh' }} >
                    <div className='flex justify-end p-3'>
                        <div className=' font-bold border p-3 h-3 w-3 rounded-full flex items-center justify-center text-[10px] text-black bg-white'>
                            H
                        </div>
                    </div>
                    <div className={`w-[208px] shadow-xl -ml-20  ${formData.theme == 'light' ? 'bg-white' : 'bg-black'} p-2`}>
                        <p className='font-bold text-[10px]'>
                            Payment Details
                        </p>
                        {formData.pricingType == 'CustomersDecidePrice' &&
                            <div>
                                <label htmlFor="customAmount" className="mb-2  text-[8px]">Custom Emount</label>
                                <input onChange={handleInputChange} type="number" id="customAmount" className=" text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                <p> {customAmountError && <p className="text-red-500 text-[8px] mt-1">{customAmountError}</p>}</p>
                            </div>
                        }
                        <div>
                            <label htmlFor="paymentPageEmail" className="mb-2  text-[8px]">Your Email</label>
                            <input type="email" id="paymentPageEmail" onChange={handleInputChange} value={formData.paymentPageEmail || 'connect.easylifetools@gmail.com'} className=" text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                        </div>
                        <div>
                            <label htmlFor="paymentPagePhone" className="mb-2  text-[8px]">Phone</label>
                            <input type="text" id="paymentPagePhone" onChange={handleInputChange} value={formData.paymentPagePhone || '9898398859'} className=" text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                        </div>
                        {formData.pricingType == 'FixedPrice' && <>
                            {formData.priceInput && <div className='mt-2'>
                                <p className='text-[8px]'>Amount total</p>
                                <div className='text-[6px] flex gap-1'>
                                    {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                                    {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                                    <p>{discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}</p>
                                </div>
                            </div>}
                        </>}

                        {formData.pricingType == 'CustomersDecidePrice' && <>
                            {formData.minimunInput && <div className='mt-2'>
                                <p className='text-[8px]'>Amount total</p>
                                <div className='text-[6px] flex gap-1'>
                                    <p className='text-bold'>₹{formData.minimunInput}</p>
                                </div>
                            </div>}
                        </>}
                        <div className='mt-2'>
                            <button style={{ background: formData.color }} className='text-white w-full text-[8px] rounded py-1 px-3 text-center'>{formData.buttonText ?? 'Make Payment ->'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopPreviewSection