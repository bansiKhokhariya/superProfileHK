import React, { useState } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button'

const SelectCreatePage = ({ setContinueBtn, continueBtn, setSelectedProduct }) => {
  const [selectMethod, setSelectMethod] = useState('');

  const handleContinue = () => {
    setSelectedProduct(selectMethod);
    setContinueBtn(true);
  };

  return (
    <>
      <div className={`relative h-full flex items-center justify-center p-8 ${continueBtn ? 'hidden' : ''}`} >
        <div className='flex flex-col items-center gap-4'>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">What do you want to sell?</h1>
          <div className='grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-5'>
            <div className={`flex flex-col justify-center items-center gap-2 border rounded-lg hover:shadow-lg p-8 ${selectMethod === 'digitalProduct' ? 'border-black' : ''} `} onClick={() => setSelectMethod('digitalProduct')}>
              <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3091_2064)">
                    <path d="M18.6665 4V9.33333C18.6665 9.68696 18.807 10.0261 19.057 10.2761C19.3071 10.5262 19.6462 10.6667 19.9998 10.6667H25.3332" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22.6665 28H9.33317C8.62593 28 7.94765 27.719 7.44755 27.219C6.94746 26.7189 6.6665 26.0406 6.6665 25.3333V6.66667C6.6665 5.95942 6.94746 5.28115 7.44755 4.78105C7.94765 4.28095 8.62593 4 9.33317 4H18.6665L25.3332 10.6667V25.3333C25.3332 26.0406 25.0522 26.7189 24.5521 27.219C24.052 27.719 23.3737 28 22.6665 28Z" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 22.667V14.667" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.6665 19.333L15.9998 22.6663L19.3332 19.333" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3091_2064">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className='font-bold text-center'>Digital Products</p>
              <p className='text-sm text-center'>Sell images, videos, music, docs, and more.</p>
            </div>
            <div className={`flex flex-col justify-center items-center gap-2 border rounded-lg hover:shadow-lg p-8 ${selectMethod === 'multipleProduct' ? 'border-black' : ''}`} onClick={() => setSelectMethod('multipleProduct')}>
              <div>
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3095_2090)">
                    <path d="M5.83301 7.99967C5.83301 7.29243 6.11396 6.61415 6.61406 6.11406C7.11415 5.61396 7.79243 5.33301 8.49967 5.33301H24.4997C25.2069 5.33301 25.8852 5.61396 26.3853 6.11406C26.8854 6.61415 27.1663 7.29243 27.1663 7.99967V10.6663C27.1663 11.3736 26.8854 12.0519 26.3853 12.552C25.8852 13.0521 25.2069 13.333 24.4997 13.333H8.49967C7.79243 13.333 7.11415 13.0521 6.61406 12.552C6.11396 12.0519 5.83301 11.3736 5.83301 10.6663V7.99967Z" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.83301 21.3337C5.83301 20.6264 6.11396 19.9481 6.61406 19.448C7.11415 18.9479 7.79243 18.667 8.49967 18.667H24.4997C25.2069 18.667 25.8852 18.9479 26.3853 19.448C26.8854 19.9481 27.1663 20.6264 27.1663 21.3337V24.0003C27.1663 24.7076 26.8854 25.3858 26.3853 25.8859C25.8852 26.386 25.2069 26.667 24.4997 26.667H8.49967C7.79243 26.667 7.11415 26.386 6.61406 25.8859C6.11396 25.3858 5.83301 24.7076 5.83301 24.0003V21.3337Z" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3095_2090">
                      <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className='font-bold text-center'>List Multiple Products</p>
              <p className='text-sm text-center'>Offer an e-commerce style experience</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 border rounded-lg  p-8 opacity-50 cursor-not-allowed'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                  <g clipPath="url(#clip0_10799_23090)">
                    <path d="M21.8333 4L27.1667 9.33333L21.8333 14.6667" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.8333 9.33334H27.1667" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.1667 17.3333L5.83333 22.6667L11.1667 28" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.83333 22.6667H17.8333" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_10799_23090">
                      <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className='font-bold text-center'>Existing Product</p>
              <p className='text-sm text-center'>Give access to your existing cosmofeed product.</p>
            </div>
          </div>
        </div>
        <Link href={'/'}>
          <Button size='sm' variant='ghost' className='absolute top-4 left-4'>⇐ Back </Button>
        </Link>
        <Button size='sm' className={`absolute bottom-4 right-4 ${selectMethod ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={handleContinue}>Continue ⇒ </Button>
      </div>
    </>
  )
}

export default SelectCreatePage;
