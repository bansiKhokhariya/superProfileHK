// 'use client';

// import React, { useState } from 'react';
// import { Dialog } from '@headlessui/react';

// const MetaPixelModal = ({ isOpen, onClose }) => {
//   const [pixelId, setPixelId] = useState('');
//   const [eventName, setEventName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />
//       <div className="relative bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6">
//         <Dialog.Title className="text-lg font-bold">Meta Pixel Configuration</Dialog.Title>
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label htmlFor="pixelId" className="block text-sm font-medium mb-2">Meta Pixel ID</label>
//             <input
//               type="text"
//               id="pixelId"
//               value={pixelId}
//               onChange={(e) => setPixelId(e.target.value)}
//               className="border rounded-lg p-2 w-full"
//               placeholder="Enter Meta Pixel ID"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="eventName" className="block text-sm font-medium mb-2">Event Name</label>
//             <input
//               type="text"
//               id="eventName"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               className="border rounded-lg p-2 w-full"
//               placeholder="Enter Event Name"
//               required
//             />
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white py-2 px-4 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </Dialog>
//   );
// };

// export default MetaPixelModal;


// MetaPixelModal.js
'use client';

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const MetaPixelModal = ({ isOpen, onClose, onSubmit }) => {
    const [pixelId, setPixelId] = useState('');
    const [eventName, setEventName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ pixelId, eventName });
        onClose(); // Close the modal after submission
    };

    return (
        <Transition
            show={isOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className='fixed  inset-0 bg-gray-200 flex items-center justify-center z-50'>
                <div className='bg-white p-6 rounded shadow-lg w-full max-w-xl max-h-full'>
                    <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
                        <h2 className='text-gray-900 font-bold mb-4'>Meta Pixel Settings</h2>
                        <button
                            type='button'
                            className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='pixelId' className="block mb-2 text-sm font-medium">
                            Pixel ID
                        </label>
                        <input type="text"
                            id="pixelId"
                            value={pixelId}
                            onChange={(e) => setPixelId(e.target.value)}
                            placeholder="Enter Pixel ID"
                            className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" />

                        <div className='mt-2'>
                            <label htmlFor='eventName' className="block mb-2 text-sm font-medium">
                                Event Name
                            </label>
                            <input type="text"
                                id="eventName"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="Enter Event Name"
                                className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" />
                        </div>
                        <button
                            type='submit'
                            className='h-8 px-2 mt-4 text-sm rounded-md bg-gray-700 text-white'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </Transition>


        // <div className='fixed top-0 left-0 w-full h-full bg-gray-200 z-50 flex justify-center items-center'>
        //     <div className=' bg-white shadow-lg p-4 rounded-md'>
        //         <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
        //             <h2 className='text-gray-900 font-bold mb-4'>Login</h2>
        //             <button
        //                 type='button'
        //                 className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
        //                 onClick={onClose()}
        //             >
        //                 ✕
        //             </button>
        //         </div>
        //         <div className=''>
        //             <form onSubmit={handleSubmit}>
        //                 <div className='mb-4'>
        //                     <label htmlFor="pixelId" className='block mb-2 text-sm font-medium'>Pixel ID</label>
        //                     <input
        //                         type="text"
        //                         id="pixelId"
        //                         value={pixelId}
        //                         onChange={(e) => setPixelId(e.target.value)}
        //                         className='border text-gray-900 text-sm rounded-lg block w-full p-2.5'
        //                         placeholder="Enter Pixel ID"
        //                         required
        //                     />
        //                 </div>
        //                 <div className='mb-4'>
        //                     <label htmlFor="eventName" className='block mb-2 text-sm font-medium'>Event Name</label>
        //                     <input
        //                         type="text"
        //                         id="eventName"
        //                         value={eventName}
        //                         onChange={(e) => setEventName(e.target.value)}
        //                         className='border text-gray-900 text-sm rounded-lg block w-full p-2.5'
        //                         placeholder="Enter Event Name"
        //                         required
        //                     />
        //                 </div>
        //                 <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-lg'>Save</button>
        //                 <button type="button" onClick={onClose} className='ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg'>Cancel</button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
};

export default MetaPixelModal;
