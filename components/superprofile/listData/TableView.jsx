import React, { useState } from 'react'
import EditPaymentPopover from '@/components/EditPaymentPopover'
import Image from 'next/image'
import { toast } from "react-hot-toast";

const TableView = ({ products, fetchProducts, handleShare }) => {

    const copyToClipboard = (productId) => {
        const link = `${window.location.origin}/vp/${productId}`;
        navigator.clipboard.writeText(link).then(function () {
            toast.success("copied to clipboard!");
        }, function (err) {
            toast.error('Error copying text: ', err);
        });
    };

    return (
        <>
            <div className="px-8 overflow-x-auto  hidden sm:block">
                <table className="min-w-full whitespace-nowrap mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-400 font-medium uppercase text-sm">Payment Page</th>
                            <th className="px-4 py-2 text-left text-gray-400 font-medium uppercase text-sm">Price</th>
                            <th className="px-4 py-2 text-left text-gray-400 font-medium uppercase text-sm">Sale</th>
                            <th className="px-4 py-2 text-left text-gray-400 font-medium uppercase text-sm">Revenue</th>
                            <th className="px-4 py-2 text-left text-gray-400 font-medium uppercase text-sm">Payments &#128712;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length === 0 ? (
                            <p>No products available</p>
                        ) : (
                            products.map((product, index) => (
                                <>
                                    <tr className="separator"></tr>
                                    <tr key={index} className="bg-white hover:bg-gray-100 border">
                                        <td className="p-4 ">
                                            <div className="flex items-center">
                                                <Image src={product.coverfiles && product.coverfiles.preview || '/images/defaultImage.webp'} width={24} height={24} className="w-12 h-12 rounded-lg mr-3" alt="Product Image" />
                                                <span className="text-gray-800 text-sm mr-5">{product.pagetitle}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">{product.offerDiscountInput || 0}</td>
                                        <td className="p-4 text-sm">0</td>
                                        <td className="p-4 text-sm">0</td>
                                        <td className="p-4 text-sm">
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
                                        </td>
                                        <td className="flex items-center justify-end pt-6 px-4">
                                            {product.isDraft && product.isPublish &&
                                                <>
                                                    <button onClick={() => { handleShare(product._id) }} className="border px-2 py-1 rounded-l-lg">
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Image src="/images/share.webp" width={10} height={10} className="w-3 h-3" alt="share svg" />
                                                            <p>Share</p>
                                                        </div>
                                                    </button>
                                                    <button onClick={() => { copyToClipboard(product._id) }} className="border px-2 py-1 rounded-r-lg mr-3">
                                                        <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </>
                                            }
                                            <div>
                                                <EditPaymentPopover productID={product._id} fetchProducts={fetchProducts} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="separator"></tr>
                                </>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableView