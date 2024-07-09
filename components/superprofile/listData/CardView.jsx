import React from 'react'
import EditPaymentPopover from '@/components/EditPaymentPopover'
import Image from 'next/image'


const CardView = ({ products, fetchProducts, handleShare }) => {
    return (
        <>
            <div className="px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2  gap-5 lg:gap-10">
                    {products && products.length === 0 ? (
                        <p>No products available</p>
                    ) : (
                        products.map((product, index) => (
                            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                                <div className="relative">
                                    <a className="relative block overflow-hidden group">
                                        <div className="w-full h-40 relative">
                                            <Image
                                                src={product.coverfiles && product.coverfiles.preview || '/images/defaultImage.webp'}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="File icon"
                                                className="transition-transform duration-300 transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                    </a>

                                    <div className="text-sm absolute top-0 right-0 bg-white px-4 text-black rounded-full h-8 w-8 flex flex-col items-center justify-center mt-3 mr-3">
                                        <EditPaymentPopover productID={product._id} fetchProducts={fetchProducts} />
                                    </div>

                                    {product.isDraft && product.isPublish && <div onClick={() => { handleShare(product._id) }}>
                                        <div
                                            className="text-sm  absolute top-0 right-9 bg-white px-4 text-black rounded-full h-8 w-8 flex flex-col items-center justify-center mt-3 mr-3 ">
                                            <svg width="15" height="15" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.5 6.5L8.5 10.5" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M8.5 13.5L15.5 17.5" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </div>
                                    </div>}

                                </div>
                                <div className="p-2">
                                    <p className="pb-2">{product.pagetitle}</p>
                                    <hr />
                                    <div className="py-2 text-gray-500 text-sm gap-2 flex flex-col">
                                        <div className="flex justify-between ">
                                            <p>Sale</p>
                                            <p>0</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p>Price</p>
                                            <p>{product.offerDiscountInput || 0}</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p>Revenue</p>
                                            <p>0</p>
                                        </div>
                                        <div className="flex justify-between ">
                                            <p>Payments &#128712;</p>
                                            {product.isDraft ?
                                                <>
                                                    {product.paymentEnable ?
                                                        <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">Enabled</span>
                                                        :
                                                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">Disabled</span>
                                                    }
                                                </>
                                                :
                                                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">Disabled</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default CardView
