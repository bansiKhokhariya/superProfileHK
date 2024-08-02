'use client'
import React, { useState, useEffect } from 'react'
import PaymentPage from '@/components/superprofile/PaymentPage/PaymentPage'
import ViewProduct from '@/components/superprofile/PaymentPage/ViewProduct'
import SuccessPaymentBox from '@/components/superprofile/PaymentPage/SuccessPaymentBox'
import toast from 'react-hot-toast'
import renderSocialIcon from '@/utils/renderSocialIcon';
// import { magic } from '@/libs/magic';
import { useSession } from "next-auth/react";

const Page = ({ params }) => {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        paymentPageEmail: '',
    });
    const [isVisibleTermsCondition, setIsVisibleTermsCondition] = useState(false);
    const [customAmountError, setCustomAmountError] = useState('');
    const [productViewPage, setProductViewPage] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentProductId, setPaymentProductId] = useState()
    const [paymentPage, setPaymentPage] = useState(0)
    const [paymentData, setPaymentData] = useState('')
    const [user, setUser] = useState('');

    /* global fbq */
    useEffect(() => {
        if (formData.metaPixelId) {
            console.log("Initialize Facebook Pixel");
            // Initialize Facebook Pixel
            !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', formData.metaPixelId);
            // fbq('track', 'PageView');
        }

    }, [formData.metaPixelId]);

    const callFacebookEvent = () => {

        if (!formData && !formData.pixelId) {
            return;
        } else {
            const eventData = {
                message: 'A successful payment was made for the product',
                additionalData: {
                    "product Name": formData.pagetitle,
                    "User Name": formData.paymentPageName,
                    "user Email": formData.paymentPageEmail,
                }
            };
            try {
                fbq('track', 'Purchase', { message: eventData.message, additionalData: eventData.additionalData });
                toast.success('Facebook event successfully called!');
            } catch (error) {
                toast.error('Failed to call Facebook event.');
            }
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            setUser(session.user);
            const localStorageValue = localStorage.getItem('loginPaymentBox');
            if (localStorageValue === 'true') {
                setProductViewPage(true);
            }
        }
    }, [session, status]);

    useEffect(() => {
        const localStorageValue = localStorage.getItem('loginPaymentBox');
        if (localStorageValue === 'true') {
            setProductViewPage(true);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                paymentPageEmail: user.email || '',
            }));
        }
    }, [user]);

    const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
        if (originalPrice && discountedPrice) {
            const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
            return Math.floor(discount);
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
        setPaymentProductId(params.productId)
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


        if (formData.limitQuantityInput) {
            try {
                const response = await fetch(`/api/superProfile/payment/getbyUser?productId=${params.productId}`, {
                    method: 'GET',
                });
                const data = await response.json();
                if (data.payments.length == formData.limitQuantityInput) {
                    toast.error('This User is no more selling this product');
                } else {
                    await nestedFunction();
                }
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        } else {
            await nestedFunction();
        }

        async function nestedFunction() {
            if (!formData.paymentPageEmail) {
                toast.error('all fields are required');
            } else {
                const amount =
                    formData.pricingType === 'FixedPrice'
                        ? discountedPrice || originalPrice
                        : formData.minimunInput;

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

                        callFacebookEvent()

                        const audienceData = {
                            name: formData.paymentPageName,
                            email: formData.paymentPageEmail,
                            // phone: formData.paymentPagePhone
                        }
                        const paymentDetails = {
                            amount: amount,
                            currency: 'INR',
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            product: params.productId,
                        }
                        try {
                            const response = fetch('/api/superProfile/payment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ audienceData, paymentDetails }),
                            });
                            setPaymentSuccess(true)
                        } catch (error) {
                            toast.error('Error during payment:', error)
                        }
                    },
                    prefill: {
                        name: formData.paymentPageName,
                        email: formData.paymentPageEmail,
                        // contact: formData.paymentPagePhone,
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
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

    useEffect(() => {
        const fetchPaymentData = async (email) => {
            try {
                const response = await fetch(`/api/superProfile/payment/getbyUser?email=${email}&productId=${params.productId}`, {
                    method: 'GET',
                });
                const data = await response.json();
                setPaymentData(data)
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };
        if (user?.email) {
            fetchPaymentData(user.email);
        }
    }, [user?.email]);

    return (
        <>
            {paymentSuccess && <SuccessPaymentBox setProductViewPage={setProductViewPage} setPaymentSuccess={setPaymentSuccess}  user={user}/>}
            {productViewPage && <ViewProduct setProductViewPage={setProductViewPage} formData={formData} />}
            {!productViewPage && <PaymentPage
                user={user}
                setProductViewPage={setProductViewPage}
                paymentData={paymentData}
                formData={formData}
                handleInputChange={handleInputChange}
                discountPercentage={discountPercentage}
                renderSocialIcon={renderSocialIcon}
                customAmountError={customAmountError}
                toggleVisibleTermsCondition={toggleVisibleTermsCondition}
                isVisibleTermsCondition={isVisibleTermsCondition}
                makePayment={makePayment}
                paymentPage={paymentPage}
                handlePaymentButton={handlePaymentButton}
                handleCloseButton={handleCloseButton}
            />}
        </>
    )
}

export default Page;
