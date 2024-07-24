import React from 'react'
import Image from 'next/image'
import Login from '@/components/Login';
import { usePathname } from 'next/navigation';

const PaymentPage = ({ paymentData, setProductViewPage, handleCloseButton, handlePaymentButton, paymentPage, makePayment, current, testimonials, formData, isVisibleTermsCondition, handleInputChange, discountPercentage, renderSocialIcon, handleNext, handlePrev, customAmountError, FaqItem, toggleVisibleTermsCondition }) => {
    const pathname = usePathname()
    return (
        <div>
            <div className='bg-black rounded-lg shadow-lg w-full hidden md:block'>
                <div className='p-2 w-full' style={{ background: formData.color }}>
                    {!formData.paymentEnable && <>
                        <p className='text-center text-sm text-white'>⏳ Sale ended ⏳</p>
                    </>}
                </div>
                <div className={`flex h-full w-full ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`} >
                    <div className={`w-full ${formData.theme == 'light' ? 'bg-white' : 'bg-black'}`}  >
                        <div className='ml-5 md:ml-20 lg:ml-40 mr-5 md:mr-60 lg:mr-80 mt-8 mb-8'>
                            <div>
                                <div className='flex gap-1 items-center'>
                                    <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={40} height={40} className='rounded-full h-12 w-12' alt='customizePageLogo' />
                                    <p className='text-sm'>{formData.customizePageTitle || 'easylifetools'}</p>
                                </div>

                                {formData.pagetitle &&
                                    <div className='mt-4'>
                                        <p className='font-bold text-lg'>{formData.pagetitle}</p>
                                        {paymentData.payment && <>
                                            <div className='mt-2 bg-green-50 border-l-4 border-green-400 pl-4 py-2 text-sm'>
                                                <p className='font-bold'>Your last purchase was successful! &nbsp; <button className='text-blue-500 underline font-medium' onClick={() => { setProductViewPage(true) }}>view details </button></p>
                                            </div>
                                        </>}
                                        {formData.coverfiles &&
                                            <div className='mt-2'>
                                                <Image src={formData.coverfiles.preview} height={500} width={500} className='rounded-md h-50 sm:h-50' alt='coverfiles' />
                                            </div>
                                        }
                                    </div>
                                }
                                {formData.description &&
                                    <>
                                        <p className='font-bold mt-4 text-sm'>
                                            Description
                                        </p>
                                        <div className='mt-1 text-sm border rounded p-2'>
                                            <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                                        </div>
                                    </>
                                }
                                <div className='border rounded-lg p-2 mt-4'>
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
                                    <p className='font-bold text-sm'>
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
                                        <p className='font-bold mt-4 text-sm'>
                                            Testimonials
                                        </p>
                                        <div className="border px-2 py-1 rounded">
                                            <p className="text-sm font-bold">{testimonials[current].name}</p>
                                            <p className="text-sm ">{testimonials[current].comment}</p>
                                            <div className="flex mt-2">
                                                <button onClick={handlePrev} className="text-sm">◀️</button>
                                                <button onClick={handleNext} className="text-sm">▶️</button>
                                            </div>
                                        </div>
                                    </>
                                }

                                {formData.supportEmail && <div className='mt-4'>
                                    <p className='cursor-pointer font-bold text-sm'>
                                        Contact easylifetools
                                    </p>
                                    <p className='text-[12px] mt-1'><span className='text-[15px]'>✉</span> &nbsp; {formData.supportEmail}</p>
                                    <p className='text-[12px]'>📞 &nbsp; {formData.supportContact}</p>
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
                                    <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold text-sm'>
                                        {isVisibleTermsCondition ? '- Terms and Conditions' : '+ Terms and Conditions'}
                                    </p>
                                    {isVisibleTermsCondition && <p className='text-sm'>You agree to share information entered on this page with easylifetools (owner of this page) and Cosmofeed, adhering to applicable laws.</p>}
                                </div>

                                <div className='w-full bg-gray-200 h-0.5 mt-6'></div>

                                <div className='mt-3'>
                                    <p className='font-bold text-xl'>HKAPPS</p>
                                    <p className='text-sm mt-1'> Want to create your own payment page? Experience hassle-free payouts and premium support. Get started now!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/3' style={{ background: formData.color }} >
                        <div className='flex justify-end p-3'>
                            <Login redirectUrl={pathname} />
                        </div>
                        <div className='p-2'>
                            <div className={` rounded-lg flex flex-col gap-3 w-full md:w-[300px] lg:w-[400px] border shadow-xl -ml-0 md:-ml-40 ${formData.theme == 'light' ? 'bg-white' : 'bg-black'} py-6 px-4`}>
                                <p className='font-bold'>Payment Details</p>
                                {formData.pricingType == 'CustomersDecidePrice' &&
                                    <div>
                                        <label htmlFor="customAmount" className="text-sm">Custom Amount</label>
                                        <input onChange={handleInputChange} type="number" id="customAmount" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                        {customAmountError && <p className="text-red-500 text-xs mt-1">{customAmountError}</p>}
                                    </div>
                                }
                                {/* <div>
                                    <label htmlFor="paymentPageName" className="text-sm">Your Name</label>
                                    <input type="text" id="paymentPageName" onChange={handleInputChange} value={formData.paymentPageName || ''} className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                </div> */}
                                <div>
                                    <label htmlFor="paymentPageEmail" className="text-sm">Your Email</label>
                                    <input type="email" id="paymentPageEmail" onChange={handleInputChange} value={formData.paymentPageEmail || ''} className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                </div>
                                {/* <div>
                                    <label htmlFor="paymentPagePhone" className="text-sm">Phone</label>
                                    <input type="text" id="paymentPagePhone" onChange={handleInputChange} value={formData.paymentPagePhone || ''} className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                </div> */}
                                {formData.pricingType == 'FixedPrice' && <>
                                    {formData.priceInput && <div className='mt-2'>
                                        <p className='text-sm'>Amount total</p>
                                        <div className='text-xs flex gap-1'>
                                            {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                                            {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                                            {discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}
                                        </div>
                                    </div>}
                                </>}

                                {formData.pricingType == 'CustomersDecidePrice' && <>
                                    {formData.minimunInput && <div className='mt-2'>
                                        <p className='text-sm'>Amount total</p>
                                        <div className='text-xs flex gap-1'>
                                            <p className='text-bold'>₹{formData.minimunInput}</p>
                                        </div>
                                    </div>}
                                </>}
                                <div className='mt-2'>
                                    <button onClick={makePayment} style={{ background: formData.color }} className='text-white w-full lg:text-lg md:text-sm text-xs rounded py-2 px-3 text-center'>{formData.buttonText ?? 'Make Payment'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block md:hidden'>
                <div className='bg-gray-100 bg-opacity-20 rounded shadow-lg w-full h-full'>
                    <div className='flex flex-col h-full'>
                        <div className='p-1 w-full' style={{ background: formData.color }}>
                            {!formData.paymentEnable && (
                                <p className='text-center text-sm text-white'>⏳ Sale ended ⏳</p>
                            )}
                        </div>
                        <div className={`flex-1 overflow-auto p-4 ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            {paymentPage === 0 ?
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-1 items-center'>
                                        <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={50} height={50} className='rounded-full h-18 w-18' alt='customizePageLogo' />
                                        <p className='text-sm'>{formData.customizePageTitle || 'easylifetools'}</p>
                                    </div>
                                    {formData.pagetitle &&
                                        <div>
                                            <p className='font-bold text-lg'>{formData.pagetitle}</p>
                                            {paymentData.payment && <>
                                                <div className='mt-2 bg-green-50 border-l-4 border-green-400 pl-4 py-2 text-sm'>
                                                    <p className='font-bold'>Your last purchase was successful! &nbsp; <button className='text-blue-500 underline font-medium' onClick={() => { setProductViewPage(true) }}>view details </button></p>
                                                </div>
                                            </>}
                                            {formData.coverfiles &&
                                                <div className='mt-2'>
                                                    <Image src={formData.coverfiles.preview} height={200} width={200} className='rounded-md h-80 w-full' alt='coverfiles' />
                                                </div>
                                            }
                                        </div>
                                    }
                                    {formData.description &&
                                        <div>
                                            <p className='font-bold  text-lg'>
                                                Description
                                            </p>
                                            <div className='mt-1 text-sm border rounded p-2'>
                                                <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                                            </div>
                                        </div>
                                    }
                                    <div className='border rounded-lg p-2 '>
                                        <div className='flex items-center gap-2 '>
                                            <div className='border w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs'>
                                                H
                                            </div>
                                            <div className='text-sm'>
                                                HK
                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <a href="https://www.instagram.com/hkappsofficial" target="_blank" rel="noopener noreferrer">
                                                <Image src='/images/instagram.webp' width={15} height={15} alt='instagram' />
                                            </a>
                                        </div>
                                    </div>
                                    {formData.faqsViewToggle && formData.faqs && <div >
                                        <p className='font-bold text-lg'>
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
                                            <p className='font-bold text-lg'>
                                                Testimonials
                                            </p>
                                            <div className="border px-2 py-2 rounded">
                                                <p className="text-sm font-bold">{testimonials[current].name}</p>
                                                <p className="text-sm ">{testimonials[current].comment}</p>
                                                <div className="flex mt-2">
                                                    <button onClick={handlePrev} className="text-sm">◀️</button>
                                                    <button onClick={handleNext} className="text-sm">▶️</button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {formData.supportEmail && <div >
                                        <p className='cursor-pointer font-bold text-lg'>
                                            Contact easylifetools
                                        </p>
                                        <p className='text-sm mt-1'><span className='text-lg'>✉</span> &nbsp; {formData.supportEmail}</p>
                                        <p className='text-sm'>📞 &nbsp; {formData.supportContact}</p>
                                    </div>}
                                    {formData.socialLinksViewToggle && formData.socialLinks && (
                                        <div className="flex">
                                            {Object.entries(formData.socialLinks).map(([platform, link], index) => (
                                                <a key={index} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="mx-0.5 text-gray-700 hover:text-gray-900">
                                                    {renderSocialIcon(platform)}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                    <div >
                                        <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold text-lg'>
                                            {isVisibleTermsCondition ? '- Terms and Conditions' : '+ Terms and Conditions'}
                                        </p>
                                        {isVisibleTermsCondition && <p className='text-sm'>You agree to share information entered on this page with easylifetools (owner of this page) and Cosmofeed, adhering to applicable laws.</p>}
                                    </div>
                                    <div className='w-full bg-gray-200 h-0.5'></div>
                                    <div>
                                        <p className='font-bold text-xl'>HKAPPS</p>
                                        <p className='text-sm mt-1'>Want to create your own payment page? Experience hassle-free payouts and premium support. Get started now!</p>
                                    </div>
                                </div>
                                :
                                <div className='flex flex-col '>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-bold text-[10px]'>Payment Details</p>
                                        <button onClick={handleCloseButton}>✖</button>
                                    </div>
                                    {formData.pricingType == 'CustomersDecidePrice' &&
                                        <div>
                                            <label htmlFor="customAmount" className="text-[8px]">Custom Amount</label>
                                            <input onChange={handleInputChange} type="number" id="customAmount" className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                            {customAmountError && <p className="text-red-500 text-[8px] mt-1">{customAmountError}</p>}
                                        </div>
                                    }
                                    {/* <div>
                                        <label htmlFor="paymentPageName" className="text-sm">Your Name</label>
                                        <input type="text" id="paymentPageName" onChange={handleInputChange} value={formData.paymentPageName || ''} className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                    </div> */}
                                    <div>
                                        <label htmlFor="paymentPageEmail" className="text-sm">Your Email</label>
                                        <input type="email" id="paymentPageEmail" onChange={handleInputChange} value={formData.paymentPageEmail || ''} className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                    </div>
                                    {/* <div>
                                        <label htmlFor="paymentPagePhone" className="text-sm">Phone</label>
                                        <input type="text" id="paymentPagePhone" onChange={handleInputChange} value={formData.paymentPagePhone || ''} className="text-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                    </div> */}
                                </div>
                            }
                        </div>
                        <div className={`sticky border-t bottom-0 flex flex-col  w-full p-3 ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                            {formData.pricingType == 'FixedPrice' && <>
                                {formData.priceInput && <div className='mt-2'>
                                    <p className='text-sm'>Amount total</p>
                                    <div className='text-xs flex gap-1'>
                                        {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                                        {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                                        {discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}
                                    </div>
                                </div>}
                            </>}

                            {formData.pricingType == 'CustomersDecidePrice' && <>
                                {formData.minimunInput && <div className='mt-2'>
                                    <p className='text-sm'>Amount total</p>
                                    <div className='text-xs flex gap-1'>
                                        <p className='text-bold'>₹{formData.minimunInput}</p>
                                    </div>
                                </div>}
                            </>}
                            <button style={{ background: formData.color }} className='text-white w-full text-sm rounded py-2 px-3 mt-3 text-center' onClick={handlePaymentButton}>{formData.buttonText ?? 'Make Payment ->'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage