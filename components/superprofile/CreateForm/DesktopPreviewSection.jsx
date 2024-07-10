'use client';
import React from 'react'
import Image from 'next/image'

const DesktopPreviewSection = ({ current, testimonials, formData, isVisibleTermsCondition, handleInputChange, discountPercentage, renderSocialIcon, handleNext, handlePrev, customAmountError, FaqItem, toggleVisibleTermsCondition }) => {

    return (
        <div className='bg-black rounded-lg shadow-lg w-full max-w-[600px] h-[300px] md:h-[548px] md:max-w-[732px] '>
            <div className='px-2 py-1 flex items-center justify-between'>
                <div className='flex gap-2'>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                </div>
                <div className='bg-gray-200 px-2 md:px-10 py-1 bg-opacity-20 rounded-md'>
                    <p className='text-[8px] text-white'>cosmofeed.com/checkoutpages</p>
                </div>
                <div></div>
            </div>
            <div className='p-1 w-full' style={{ background: formData.color }}>
                {!formData.paymentEnable && <>
                    <p className='text-center text-[10px] text-white'>⏳ Sale ended ⏳</p>
                </>}
            </div>
            <div className={`flex w-full ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`} >
                <div className={`w-full desktop-preview-container  ${formData.theme == 'light' ? 'bg-white' : 'bg-black'}`}  >
                    <div className='ml-5 md:ml-20 mr-5 md:mr-40 mt-8 mb-8'>
                        <div>
                            <div className='flex gap-1 items-center'>
                                <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={30} height={30} className='rounded-full h-6 w-6 sm:w-8 sm:h-8' alt='customizePageLogo' />
                                <p className='text-[8px] sm:text-xs'>{formData.customizePageTitle || 'easylifetools'}</p>
                            </div>
                            {formData.pagetitle &&
                                <div className='mt-4'>
                                    <p className='font-bold text-sm'>{formData.pagetitle}</p>
                                    {formData.coverfiles &&
                                        <div className='mt-2'>
                                            <Image src={formData.coverfiles.preview} height={200} width={200} className='rounded-md h-30 sm:h-40' alt='coverfiles' />
                                        </div>
                                    }
                                </div>
                            }
                            {formData.description &&
                                <>
                                    <p className='font-bold mt-4 text-[8px]'>
                                        Description
                                    </p>
                                    <div className='mt-1 text-[8px] border rounded p-2'>
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
                                            <button onClick={handlePrev} className="text-[8px]">◀️</button>
                                            <button onClick={handleNext} className="text-[8px]">▶️</button>
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
                                <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold text-[8px]'>
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
                <div className='w-full md:w-1/3' style={{ background: formData.color }} >
                    <div className='flex justify-end p-3'>
                        <div className='font-bold border p-2 h-2 w-3 sm:w-3 sm:h-3 rounded-full flex items-center justify-center text-[8px] sm-text-[10px] text-black bg-white'>
                            H
                        </div>
                    </div>
                    <div className='p-2 '>
                        <div className={`w-full md:w-[208px] shadow-xl -ml-0 md:-ml-20 ${formData.theme == 'light' ? 'bg-white' : 'bg-black'} p-2`}>
                            <p className='font-bold text-[10px]'>Payment Details</p>
                            {formData.pricingType == 'CustomersDecidePrice' &&
                                <div>
                                    <label htmlFor="customAmount" className="mb-2 text-[8px]">Custom Amount</label>
                                    <input onChange={handleInputChange} type="number" id="customAmount" className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                    {customAmountError && <p className="text-red-500 text-[8px] mt-1">{customAmountError}</p>}
                                </div>
                            }
                            <div>
                                <label htmlFor="paymentPageEmail" className="mb-2 text-[8px]">Your Email</label>
                                <input type="email" id="paymentPageEmail" onChange={handleInputChange} value={formData.paymentPageEmail || 'connect.easylifetools@gmail.com'} className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                            </div>
                            <div>
                                <label htmlFor="paymentPagePhone" className="mb-2 text-[8px]">Phone</label>
                                <input type="text" id="paymentPagePhone" onChange={handleInputChange} value={formData.paymentPagePhone || '9898398859'} className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                            </div>
                            {formData.pricingType == 'FixedPrice' && <>
                                {formData.priceInput && <div className='mt-2'>
                                    <p className='text-[8px]'>Amount total</p>
                                    <div className='text-[6px] flex gap-1'>
                                        {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                                        {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                                        {discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}
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
                                <button style={{ background: formData.color }} onClick={() => { alert('easylifetools is not accepting payments at the moment') }} className='text-white w-full text-[8px] rounded py-1 px-3 text-center'>{formData.buttonText ?? 'Make Payment'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopPreviewSection