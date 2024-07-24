import React from 'react'
import Image from 'next/image'

const ViewProduct = ({ setProductViewPage, formData }) => {
    const currentUrl = `${window.location.origin}/vp/${formData._id}`;

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check%20this%20out!`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=Check%20this%20out!`
    };

    return (
        <>
            <div style={{ height: '100dvh' }}>
                <button className='fixed top-0 bg-white py-8 px-20 border-b w-full text-left' onClick={() => { setProductViewPage(false), localStorage.removeItem('loginPaymentBox'); }}> {' <- back '}</button>
                <div className='bg-gray-200 gap-4 flex py-8 px-20 w-full h-full mt-20'>
                    <div className='w-1/2 flex flex-col gap-4'>
                        <div className='bg-white border border-gray-300 rounded-lg'>
                            <div className='p-4  border-b '>
                                <p className='font-bold'>{formData.pagetitle}</p>

                            </div>
                            <div className='p-4 gap-2 flex flex-col justify-center items-center'>
                                <p className='text-sm text-center'>Want to make another payment?</p>
                                <button className='bg-pink-500 px-4 py-2 rounded-lg text-white text-sm' onClick={() => { setProductViewPage(false) }}>{formData.buttonText || 'Make Payment'}</button>
                            </div>
                        </div>
                        <div className='bg-white border border-gray-300 rounded-lg'>
                            <div className='p-4 border-b'>
                                <p className='font-bold'>Contact easylifetools</p>
                            </div>
                            <div className='p-4 gap-1 '>
                                <p className='text-gray-500 '>{formData.supportEmail}</p>
                                <p className='text-gray-500 '>{formData.supportContact}</p>
                            </div>
                        </div>
                        <div className='bg-white border border-gray-300 rounded-lg'>
                            <div className='p-4 border-b'>
                                <p className='font-bold'>Invite your friends</p>
                            </div>
                            <div className='p-4 flex gap-1 items-center'>
                                <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
                                    <Image src='/svg/facebook.svg' width={20} height={20} className='rounded' alt='facebook' />
                                </a>
                                <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
                                    <Image src='/svg/twitter.svg' width={20} height={20} className='rounded' alt='twitter' />
                                </a>
                                <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
                                    <Image src='/images/whatsapp.webp' width={20} height={20} className='rounded w-5 h-5' alt='whatsapp' />
                                </a>
                                <a href={shareUrls.telegram} target="_blank" rel="noopener noreferrer">
                                    <Image src='/svg/telegram.svg' width={22} height={22} className='rounded' alt='telegram' />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='border-b pb-4 border-gray-500'>
                            <p className='text-xl font-bold'>Digital files</p>
                        </div>
                        <div className='py-4'>
                            <p className='font-bold text-gray-600'>Images</p>
                            <div className='flex flex-wrap gap-2'>
                                {formData && formData.digitalFiles && formData.digitalFiles.length !== 0 ? (
                                    formData.digitalFiles.map((file, index) => (
                                        <div key={index}>
                                            {typeof file === 'object' && file.preview ? (
                                                <div className='bg-white rounded-lg shadow-lg'>
                                                    <Image
                                                        src={file.preview}
                                                        width={260}
                                                        height={300}
                                                        className='rounded'
                                                        alt='Preview'
                                                    />
                                                    <a
                                                        href={file.preview}
                                                        download
                                                        className='block p-3 text-center font-bold'
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            ) : null}
                                        </div>
                                    ))
                                ) : null}
                            </div>
                            {formData && formData.digitalFiles && formData.digitalFiles.some(file => typeof file === 'string') ? (
                                <div className='py-4'>
                                    {formData.digitalFiles.filter(file => typeof file === 'string').map((file, index) => (
                                        <div key={index} className='mb-2 bg-white rounded-lg shadow p-4 flex justify-between items-center'>
                                            <h3 className="">Product Links</h3>
                                            {file.split(',').map((url, idx) => (
                                                <a key={idx} href={url} className='bg-gray-600 text-sm text-white px-3 py-2 rounded-md' target='_blank' rel='noopener noreferrer'>
                                                    Visit website
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct