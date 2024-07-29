import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from "react-hot-toast";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const MobilePreviewSection = ({ commanPartMainContainer, formData, handleInputChange, discountPercentage, customAmountError }) => {

  const [paymentPage, setPaymentPage] = useState(0)

  const handlePaymentButton = () => {
    if (paymentPage === 0) {
      setPaymentPage(paymentPage + 1)
    } else {
      toast.error('easylifetools is not accepting payments at the moment');
    }
  }

  const handleCloseButton = () => {
    if (paymentPage !== 0) {
      setPaymentPage(paymentPage - 1)
    }
  }

  return (
    <>
      <div className='bg-gray-100 bg-opacity-20 rounded shadow-lg w-full max-w-[300px] md:max-w-[300px] h-[500px] md:h-[700px]'>
        <div className='bg-gray-100 bg-opacity-20 rounded shadow-lg w-full h-full'>
          <div className='sticky top-0 px-2 py-1 flex items-center justify-center'>
            <div className='bg-gray-100 px-2 md:px-10 py-1 bg-opacity-30 rounded-md'>
              <p className='text-[8px] text-white'>cosmofeed.com/checkoutpages</p>
            </div>
          </div>
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
              <Button onClick={handlePaymentButton} size='lg' className='w-full mt-3'>{formData.buttonText ?? 'Make Payment'}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobilePreviewSection