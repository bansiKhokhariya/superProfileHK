'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import PaymentPage from '@/components/superprofile/PaymentPage/PaymentPage'
import { toast } from "react-hot-toast";

const Page = ({ params }) => {
    const [formData, setFormData] = useState({});
    const [isVisibleTermsCondition, setIsVisibleTermsCondition] = useState(false);
    const [current, setCurrent] = useState(0);
    const [customAmountError, setCustomAmountError] = useState('');

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

    useEffect(() => {
        if (params.productId) {
            const fetchData = async () => {
                try {
                    const url = `/api/superProfile/DigitalPaymentProduct/getById/${params.productId}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setFormData(data.product);
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };
            fetchData();
        }
    }, [params.productId]);

    const toggleVisibleTermsCondition = () => {
        setIsVisibleTermsCondition(!isVisibleTermsCondition);
    };

    const FaqItem = ({ item }) => {
        const accordion = useRef(null);
        const [isOpen, setIsOpen] = useState(false);

        return (
            <li>
                <button
                    className="flex flex-col gap-1 w-full px-2 pt-2 pb-1 border rounded"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                    aria-expanded={isOpen}
                >
                    <div className='flex items-center justify-between w-full'>
                        <span
                            className={`text-sm font-bold`}
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
                        <div className="text-left text-xs mb-1">{item?.answer}</div>
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
                return <Image src='/svg/facebook.svg' width={20} height={20} className='rounded' alt='facebook' />;
            case 'twitter':
                return <Image src='/svg/twitter.svg' width={20} height={20} className='rounded' alt='twitter' />;
            case 'instagram':
                return <Image src='/svg/instagram.svg' width={20} height={20} className='rounded' alt='instagram' />;
            case 'linkedin':
                return <Image src='/svg/linkedin.svg' width={20} height={20} className='rounded' alt='linkedin' />;
            case 'youtube':
                return <Image src='/svg/youtube.svg' width={20} height={20} className='rounded' alt='youtube' />;
            case 'threads':
                return <Image src='/svg/threads.svg' width={20} height={20} className='rounded' alt='threads' />;
            case 'behance':
                return <Image src='/svg/behance.svg' width={20} height={20} className='rounded' alt='behance' />;
            case 'dribbble':
                return <Image src='/svg/dribbble.svg' width={20} height={20} className='rounded' alt='dribbble' />;
            case 'whatsapp':
                return <Image src='/svg/whatsapp.svg' width={20} height={20} className='rounded' alt='whatsapp' />;
            default:
                return null; // Add more cases as needed
        }
    };

    const [paymentPage, setPaymentPage] = useState(0)

    const handlePaymentButton = () => {
        if (paymentPage === 0) {
            setPaymentPage(paymentPage + 1)
        }
        else {
            makePayment();
        }
    }

    const handleCloseButton = () => {
        if (paymentPage !== 0) {
            setPaymentPage(paymentPage - 1)
        }
    }


    const makePayment = async () => {

        if (!formData.paymentPageEmail && !formData.paymentPageName && !formData.paymentPagePhone) {
            toast.error('all fields are required');
        } else {

            const amount =
                formData.pricingType === 'FixedPrice'
                    ? discountedPrice || originalPrice
                    : formData.customAmount;

            if (amount < formData.minimunInput) {
                setCustomAmountError(`Amount should be more than ${formData.minimunInput}`);
                return;
            }


            const res = await initializeRazorpay();

            if (!res) {
                toast.error('Razorpay SDK Failed to load');
                return;
            }

            // Make API call to the serverless API
            const response = await fetch('/api/razorpay/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: amount * 100 }) // Send amount in paisa
            });
            const data = await response.json();

            var options = {
                key: process.env.RAZORPAY_KEY, // Use NEXT_PUBLIC prefix for client-side env vars
                name: "HKAPPS Product",
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                description: "Thank you for your test donation",
                image: "https://hkapps.in/cdn/shop/files/Frame_30.png?v=1712860278&width=50",
                handler: function (response) {
                    // Validate payment at server - using webhooks is a better idea.
                    console.log('razorpay_payment_id===>', response.razorpay_payment_id + 'razorpay_order_id====>', response.razorpay_order_id + 'razorpay_signature====>', response.razorpay_signature);
                    toast.success("Payment has been successfully processed");
                },
                prefill: {
                    name: formData.paymentPageName,
                    email: formData.paymentPageEmail,
                    contact: formData.paymentPagePhone,
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }

    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            // document.body.appendChild(script);
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    return (
        <>
            <PaymentPage
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
                makePayment={makePayment}
                paymentPage={paymentPage}
                handlePaymentButton={handlePaymentButton}
                handleCloseButton={handleCloseButton}
            />
        </>
    )
}

export default Page;
