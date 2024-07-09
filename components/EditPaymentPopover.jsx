// "use client";
// import React from 'react'
// import { Popover, Transition } from "@headlessui/react";
// import { useRouter } from 'next/navigation'
// import axios from 'axios'


// const EditPaymentPopover = ({ productID, fetchProducts }) => {

//   const router = useRouter();

//   const handleEdit = () => {
//     router.push(`/create-payment-page/${productID}`);
//   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product permanently?");

//     if (confirmDelete) {
//       axios.delete(`/api/superProfile/DigitalPaymentProduct/getById/${productID}`)
//         .then(response => {
//           fetchProducts()
//         })
//         .catch(error => {
//           console.error('Delete failed:', error);
//           // Handle error, e.g., show an error message or log the error
//         });
//     }
//   };

//   const handleOpenLink = async () => {
//     router.push(`/vp/${productID}`);
//   }

//   return (
//     <Popover className="relative z-10">
//       {() => (
//         <>
//           <Popover.Button className="focus:outline-none">
//             <b className="text-xl">⋮</b>
//           </Popover.Button>
//           <Transition
//             enter="transition duration-100 ease-out"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition duration-75 ease-out"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Popover.Panel className="absolute right-2 z-10 mt-3 w-50  transform bg-white">
//               <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-base-content ring-opacity-5">
//                 <ul>
//                   <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleEdit}>Edit</li>
//                   <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleOpenLink} >Open Link</li>
//                   {/* <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer">Duplicate</li> */}
//                   <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer">Disable Payments</li>
//                   <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer">Un-publish</li>
//                   <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer text-red-500" onClick={handleDelete}>Delete Permanently</li>
//                 </ul>
//               </div>
//             </Popover.Panel>
//           </Transition>
//         </>
//       )}
//     </Popover>
//   );
// };

// export default EditPaymentPopover;



"use client";
import React, { useState, useEffect } from 'react';
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const EditPaymentPopover = ({ productID, fetchProducts }) => {
  const router = useRouter();
  const [productSetting, setProductSetting] = useState({ isPublish: '', paymentEnable: '' });

  useEffect(() => {
    if (productID) {
      // Fetch the initial state of paymentEnable from the backend
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/superProfile/DigitalPaymentProduct/getById/${productID}`);
          setProductSetting({ isPublish: response.data.product.isPublish, paymentEnable: response.data.product.paymentEnable, isDraft: response.data.product.isDraft });
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
      fetchProduct();
    }
  }, [productID]);

  const handleEdit = () => {
    router.push(`/create-payment-page/${productID}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product permanently?");
    if (confirmDelete) {
      axios.delete(`/api/superProfile/DigitalPaymentProduct/getById/${productID}`)
        .then(() => {
          fetchProducts();
        })
        .catch(error => {
          console.error('Delete failed:', error);
        });
    }
  };

  const handleOpenLink = async () => {
    router.push(`/vp/${productID}`);
  }

  const handleTogglePublish = async () => {
    try {
      const newIsPublish = !productSetting.isPublish;
      await axios.patch(`/api/superProfile/DigitalPaymentProduct/getById/${productID}`, {
        field: 'isPublish',
        value: newIsPublish
      });
      setProductSetting({ ...productSetting, isPublish: newIsPublish, paymentEnable: newIsPublish ? productSetting.paymentEnable : false });
      fetchProducts();
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  const handleTogglePayment = async () => {
    try {
      const newPaymentEnable = !productSetting.paymentEnable;
      await axios.patch(`/api/superProfile/DigitalPaymentProduct/getById/${productID}`, {
        field: 'paymentEnable',
        value: newPaymentEnable
      });
      setProductSetting({ ...productSetting, paymentEnable: newPaymentEnable });
      fetchProducts();
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  return (
    <Popover className="relative z-10">
      {() => (
        <>
          <Popover.Button className="focus:outline-none">
            <b className="text-xl">⋮</b>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute right-2 z-10 mt-3 w-50 transform bg-white">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-base-content ring-opacity-5">
                <ul>
                  <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleEdit}>Edit</li>
                  {productSetting.isDraft && productSetting.isPublish && <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleOpenLink}>Open Link</li>}
                  {productSetting.isDraft && productSetting.isPublish && <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleTogglePayment}>
                    {productSetting.paymentEnable ? 'Disable Payments' : 'Enable Payments'}
                  </li>}
                  {productSetting.isDraft && <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={handleTogglePublish}>
                    {productSetting.isPublish ? 'Un-publish' : 'Publish'}
                  </li>}
                  <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer text-red-500" onClick={handleDelete}>Delete Permanently</li>
                </ul>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default EditPaymentPopover;
