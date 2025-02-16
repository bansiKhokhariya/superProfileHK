import React from 'react'
import EditPaymentPopover from '@/components/EditPaymentPopover'
import Image from 'next/image'
import { toast } from "react-hot-toast";
import { Button } from '@/components/ui/button'

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
            <div className='px-8'>
                <div className="relative overflow-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right ">
                        <thead className="text-xs text-gray-700 uppercase bg-indigo-500 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Payment page
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sale
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Revenue
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length === 0 ? (
                                <p className='font-bold py-4 px-2'>No products available</p>
                            ) : (
                                products.map((product, index) => (
                                    <tr className="bg-white border-b " key={index}>
                                        <th scope="row" className="p-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <Image src={product.coverfiles && product.coverfiles.preview || '/images/defaultImage.webp'} width={24} height={24} className="w-12 h-12 rounded-lg mr-3" alt="Product Image" />
                                                <span className="text-gray-800 text-sm mr-5">{product.pagetitle}</span>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.pricingType == "FixedPrice" ?
                                                <p>{product.offerDiscountCheckbox ? product.offerDiscountInput || 0 : product.priceInput || 0}</p>
                                                :
                                                <p>{product.suggestPriceCheckbox ? product.suggestPriceInput || 0 : product.minimunInput || 0}</p>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.sale || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.revenue || 0}
                                        </td>
                                        <td className="px-6 py-4 text-right flex  justify-end ">
                                            <div href="#" className="font-medium flex justify-center items-center gap-3 text-blue-600 dark:text-blue-500 mt-3">
                                                {product.isDraft && product.isPublish &&
                                                    <div className='flex justify-center gap-1 items-center'>
                                                        <Button variant='outline' size='sm' onClick={() => { handleShare(product._id) }}>
                                                            <div className="flex items-center gap-1 text-sm">
                                                                <Image src="/images/share.webp" width={10} height={10} className="w-3 h-3" alt="share svg" />
                                                                <p>Share</p>
                                                            </div>
                                                        </Button>
                                                        <Button variant='outline' size='sm' onClick={() => { copyToClipboard(product._id) }}>
                                                            <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                }
                                                <div>
                                                    <EditPaymentPopover productID={product._id} fetchProducts={fetchProducts} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TableView