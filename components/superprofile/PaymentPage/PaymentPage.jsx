import React from 'react'
import Image from 'next/image'
// import Login from '@/components/Login';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import ButtonAccount from '@/components/ButtonAccount';
import ButtonSignin from '@/components/ButtonSignin';

const PaymentPage = ({ user, paymentData, setProductViewPage, handleCloseButton, handlePaymentButton, paymentPage, makePayment, formData, isVisibleTermsCondition, handleInputChange, discountPercentage, renderSocialIcon, customAmountError, toggleVisibleTermsCondition }) => {
    const pathname = usePathname()

    const commanPartMainContainer = () => {
        return (
            <div className='flex flex-col gap-5'>
                <div className='flex gap-1 items-center'>
                    <Image src={formData && formData.customizePageLogo && formData.customizePageLogo.preview || "/images/mainLogo.webp"} width={80} height={80} className='rounded-full h-20 w-20' alt='customizePageLogo' />
                    <p className='text-lg'>{formData.customizePageTitle || 'easylifetools'}</p>
                </div>
                {formData.pagetitle &&
                    <div>
                        <p className='font-bold text-xl'>{formData.pagetitle}</p>
                    </div>
                }
                {paymentData.payment && <>
                    <div className='bg-green-50 border-l-4 border-green-400 pl-4 py-2 text-sm'>
                        <p className='font-bold text-green-800'>Your last purchase was successful! &nbsp; <button className='text-blue-500 underline font-medium' onClick={() => { setProductViewPage(true) }}>view details </button></p>
                    </div>
                </>}
                {formData.coverfiles &&
                    <div>
                        <Image src={formData.coverfiles.preview} height={300} width={300} className='rounded-md ' alt='coverfiles' />
                    </div>
                }
                {formData.description &&
                    <div >
                        <p className='font-bold text-lg'>
                            Description
                        </p>
                        <div className={`mt-2 text-sm shadow border rounded p-4 `}>
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
                    <p className='font-bold text-lg'>
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
                        <p className='font-bold text-lg'>
                            Testimonials
                        </p>
                        <div className='px-12'>
                            <Carousel>
                                <CarouselContent>
                                    {formData.testimonials.map((testimonial, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex flex-col p-4">
                                                        <div className='text-[40px]'> ❝</div>
                                                        <span className="font-semibold -mt-5">{testimonial.name}</span>
                                                        <p className="text-base">{testimonial.comment}</p>
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
                    <p className='cursor-pointer font-bold text-lg'>
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
                    <p onClick={toggleVisibleTermsCondition} className='cursor-pointer font-bold text-lg'>
                        {isVisibleTermsCondition ? '- Terms and Conditions' : '+ Terms and Conditions'}
                    </p>
                    {isVisibleTermsCondition && <p className='text-sm'>You agree to share information entered on this page with easylifetools (owner of this page) and Cosmofeed, adhering to applicable laws.</p>}
                </div>
                <div className='w-full bg-gray-200 h-0.5'></div>
                <div>
                    <p className='font-bold text-xl'>HKAPPS</p>
                    <p className='text-sm mt-1'> Want to create your own payment page? Experience hassle-free payouts and premium support. Get started now!</p>
                </div>
            </div>
        )
    }

    const paymentPart = () => {
        return (
            <div className='flex flex-col gap-3'>
                {formData.pricingType == 'CustomersDecidePrice' &&
                    <div className="grid w-full max-w-sm items-center gap-2">
                        <Label htmlFor="customAmount">Custom Amount</Label>
                        <Input onChange={handleInputChange} type="number" id="customAmount" />
                        {customAmountError && <p className="text-red-500 text-xs">{customAmountError}</p>}
                    </div>
                }
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="paymentPageEmail">Email</Label>
                    <Input type="email" id="paymentPageEmail" placeholder="Enter your Email" onChange={handleInputChange} value={formData.paymentPageEmail || ''} />
                </div>
                {paymentAmountPart()}
                <Button onClick={makePayment} size='lg' className='w-full'>{formData.buttonText ?? 'Make Payment'}</Button>
                <hr />
            </div>
        )
    }

    const paymentAmountPart = () => {
        return (
            <div className='flex flex-col gap-3'>
                {formData.pricingType == 'FixedPrice' && <>
                    {formData.priceInput && <div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label>Amount total</Label>
                            <div className='text-xs flex gap-1'>
                                {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                                {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                                {discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}
                            </div>
                        </div>
                    </div>}
                </>}
                {formData.pricingType == 'CustomersDecidePrice' && <>
                    {formData.minimunInput && <div>
                        <Label>Amount total</Label>
                        <div className='text-xs flex gap-1'>
                            <p className='text-bold'>₹{formData.minimunInput}</p>
                        </div>
                    </div>}
                </>}
            </div>
        )
    }

    return (
        <div>
            <div className='rounded-lg shadow-lg w-full hidden md:block'>
                <div className='p-2 w-full' style={{ background: formData.color }}>
                    {!formData.paymentEnable && <>
                        <p className='text-center text-sm text-white'>⏳ Sale ended ⏳</p>
                    </>}
                </div>
                <div className={`flex h-full w-full ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`} >
                    <div className={`w-full ${formData.theme == 'light' ? 'bg-white' : 'bg-black'}`}  >
                        <div className='ml-5 md:ml-10 lg:ml-20 xl:ml-40 mr-5 md:mr-40 lg:mr-52 xl:mr-80 mt-8 mb-8'>
                            {commanPartMainContainer()}
                        </div>
                    </div>
                    <div className='w-full md:w-1/3' style={{ background: formData.color }} >
                        <div className='flex justify-end p-3'>
                            {user ?  <ButtonAccount /> :  <ButtonSignin />}
                        </div>
                        <div className='p-2'>
                            <div
                                className={`${formData.theme == 'light' ? 'bg-white' : 'bg-black'} rounded-lg flex flex-col gap-3 w-full md:w-[350px] lg:w-[400px] border shadow-xl -ml-0 md:-ml-40 py-6 px-4`}>
                                <h1 className="text-2xl mb-2 font-bold">Payment Details</h1>
                                {paymentPart()}
                                <div className='bg-gray-100 text-black text-sm text-center py-3'>
                                    Guaranteed safe & secure payment
                                    <div className='flex items-center justify-around pt-3'>
                                        <div>
                                            <Image src='/images/cards/visa.webp' width={50} height={50} className='md:w-30 md:h-30' alt='cardImage' />
                                        </div>
                                        <div>
                                            <Image src='/images/cards/googlepay.webp' width={50} height={50} className='md:w-30 md:h-30' alt='cardImage' />
                                        </div>
                                        <div>
                                            <Image src='/images/cards/mastercard.webp' width={50} height={50} className='md:w-30 md:h-30' alt='cardImage' />
                                        </div>
                                        <div>
                                            <Image src='/images/cards/phonepe.webp' width={50} height={50} className='md:w-30 md:h-30' alt='cardImage' />
                                        </div>
                                        <div>
                                            <Image src='/images/cards/paytm.webp' width={50} height={50} className='md:w-30 md:h-30' alt='cardImage' />
                                        </div>
                                    </div>
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
                                commanPartMainContainer()
                                :
                                <div className='flex flex-col gap-3'>
                                    <div className='flex justify-between items-center'>
                                        <h1 className="text-2xl mb-2 font-bold">Payment Details</h1>
                                        <button className='text-2xl' onClick={handleCloseButton}>✖</button>
                                    </div>
                                    {formData.pricingType == 'CustomersDecidePrice' &&
                                        <div className="grid w-full max-w-sm items-center gap-2">
                                            <Label htmlFor="customAmount">Custom Amount</Label>
                                            <Input onChange={handleInputChange} type="number" id="customAmount" />
                                            {customAmountError && <p className="text-red-500 text-xs">{customAmountError}</p>}
                                        </div>
                                    }
                                    <div className="grid w-full max-w-sm items-center gap-2">
                                        <Label htmlFor="paymentPageEmail">Email</Label>
                                        <Input type="email" id="paymentPageEmail" placeholder="Enter your Email" onChange={handleInputChange} value={formData.paymentPageEmail || ''} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={`sticky border-t bottom-0 flex flex-col  w-full p-3 ${formData.theme == 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            {paymentAmountPart()}
                            <Button onClick={handlePaymentButton} size='lg' className='w-full mt-3'>{formData.buttonText ?? 'Make Payment'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage