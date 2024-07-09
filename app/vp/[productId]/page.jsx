'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Page = ({ params }) => {
    const [formData, setFormData] = useState({});
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

    const handlePayment = async () => {
        const amount = formData.pricingType === 'FixedPrice' ? discountedPrice || originalPrice : formData.customAmount;

        if (amount < formData.minimunInput) {
            setCustomAmountError(`Amount should be more than ${formData.minimunInput}`);
            return;
        }

        try {
            const response = await fetch('/api/razorpay/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            });
            const { id: orderId } = await response.json();

            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from the Dashboard
                amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 1000 refers to 1000 paise
                currency: "INR",
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder API call
                handler: function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                },
                prefill: {
                    name: "Your Name",
                    email: "email@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error initiating Razorpay transaction:', error);
        }
    };

    return (
        <div className={`w-1/2 shadow-xl p-2`}>
            <p className='font-bold text-[10px]'>
                Payment Details
            </p>
            {formData.pricingType == 'CustomersDecidePrice' &&
                <div>
                    <label htmlFor="customAmount" className="mb-2 ">Custom Amount</label>
                    <input onChange={handleInputChange} type="number" id="customAmount" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                    <p>{customAmountError && <p className="text-red-500 mt-1">{customAmountError}</p>}</p>
                </div>
            }
            <div>
                <label htmlFor="paymentPageEmail" className="mb-2">Your Email</label>
                <input type="email" id="paymentPageEmail" onChange={handleInputChange} value={formData.paymentPageEmail || 'connect.easylifetools@gmail.com'} className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
            </div>
            <div>
                <label htmlFor="paymentPagePhone" className="mb-2">Phone</label>
                <input type="text" id="paymentPagePhone" onChange={handleInputChange} value={formData.paymentPagePhone || '9898398859'} className="text-[8px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
            </div>
            {formData.pricingType == 'FixedPrice' && <>
                {formData.priceInput && <div className='mt-2'>
                    <p className=''>Amount total</p>
                    <div className='flex gap-1'>
                        {formData.offerDiscountInput && <p className='text-bold'>₹{formData.offerDiscountInput}</p>}
                        {!formData.offerDiscountInput ? <>{formData.priceInput && <p>₹{formData.priceInput}</p>}</> : <p><s>₹{formData.priceInput}</s></p>}
                        <p>{discountPercentage !== null && <p className='text-green-600'>({discountPercentage}% off)</p>}</p>
                    </div>
                </div>}
            </>}
            {formData.pricingType == 'CustomersDecidePrice' && <>
                {formData.minimunInput && <div className='mt-2'>
                    <p className=''>Amount total</p>
                    <div className='flex gap-1'>
                        <p className='text-bold'>₹{formData.minimunInput}</p>
                    </div>
                </div>}
            </>}
            <div className='mt-2'>
                <button onClick={handlePayment} style={{ background: formData.color }} className='text-white w-full rounded py-1 px-3 text-center'>{formData.buttonText ?? 'Make Payment ->'}</button>
            </div>
        </div>
    )
}

export default Page;
