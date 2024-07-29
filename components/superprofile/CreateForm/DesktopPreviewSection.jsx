'use client';
import React from 'react'
import Image from 'next/image'
import { toast } from "react-hot-toast";
import { Button } from '@/components/ui/button'

const DesktopPreviewSection = ({ commanPartMainContainer, current, testimonials, formData, isVisibleTermsCondition, handleInputChange, discountPercentage, renderSocialIcon, handleNext, handlePrev, customAmountError, FaqItem, toggleVisibleTermsCondition }) => {

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
                        {commanPartMainContainer()}
                    </div>
                </div>
                <div className='w-full md:w-1/3' style={{ background: formData.color }} >
                    <div className='flex justify-end p-3'>
                        <Button variant="outline" size='sm'>Sign in</Button>
                    </div>
                    <div className='p-2'>
                        <div className={`w-full md:w-[208px] shadow-xl rounded-lg -ml-0 md:-ml-20 ${formData.theme == 'light' ? 'bg-white' : 'bg-black'} p-2`}>
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
                                <button style={{ background: formData.color }} onClick={() => { toast.error('easylifetools is not accepting payments at the moment'); }} className='text-white w-full text-[8px] rounded py-1 px-3 text-center'>{formData.buttonText ?? 'Make Payment'}</button>
                            </div>
                            <div className='bg-gray-100 text-black text-[8px] text-center py-2 mt-2'>
                                Guaranteed safe & secure payment
                                <div className='flex items-center justify-around pt-3'>
                                    <div>
                                        <Image src='/images/cards/visa.webp' width={30} height={30} />
                                    </div>
                                    <div>
                                        <Image src='/images/cards/googlepay.webp' width={30} height={30} />
                                    </div>
                                    <div>
                                        <Image src='/images/cards/mastercard.webp' width={30} height={30} />
                                    </div>
                                    <div>
                                        <Image src='/images/cards/phonepe.webp' width={30} height={30} />
                                    </div>
                                    <div>
                                        <Image src='/images/cards/paytm.webp' width={30} height={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopPreviewSection