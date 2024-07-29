// 'use client';
// import React, { useState, useEffect } from 'react';

// const SocialLinksModal = ({ showModal, handleClose, handleFormSubmit, formData }) => {
//   if (!showModal) return null;

//   const initialSocialLinks = {
//     instagram: '',
//     twitter: '',
//     facebook: '',
//     youtube: '',
//     linkedin: '',
//     threads: '',
//     behance: '',
//     dribbble: '',
//     whatsapp: ''
//   };

//   const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
//   const [selectedSocial, setSelectedSocial] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (formData && formData.socialLinks) {
//       const selected = Object.keys(formData.socialLinks);
//       setSelectedSocial(selected);
//       const updatedSocialLinks = {
//         ...initialSocialLinks,
//         ...formData.socialLinks
//       };
//       setSocialLinks(updatedSocialLinks);
//     } else {
//       setSelectedSocial([]);
//       setSocialLinks(initialSocialLinks);
//     }
//   }, [formData]);

//   const handleInputChange = (e, social) => {
//     setSocialLinks({ ...socialLinks, [social]: e.target.value });
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     selectedSocial.forEach(social => {
//       if (!socialLinks[social]) {
//         newErrors[social] = `${social} username is required`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       const fullLinks = selectedSocial.reduce((acc, social) => {
//         acc[social] = `${social}.com/${socialLinks[social]}`;
//         return acc;
//       }, {});
//       handleFormSubmit(fullLinks);
//       handleClose();
//     }
//   };

//   const handleSocialLinkSelect = (social) => {
//     if (selectedSocial.includes(social)) {
//       setSelectedSocial(selectedSocial.filter(item => item !== social));
//     } else {
//       setSelectedSocial([...selectedSocial, social]);
//     }
//     setErrors({});
//   };

//   const handleCancel = (social) => {
//     setSelectedSocial(selectedSocial.filter(item => item !== social));
//     setSocialLinks({ ...socialLinks, [social]: '' });
//     setErrors({});
//   };

//   return (
//     <div className='fixed top-0 left-0 w-full h-full bg-gray-200 z-10 flex justify-center items-center'>
//       <div className='w-full max-w-2xl max-h-full bg-white shadow-lg p-4 rounded-md'>
//         <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
//           <h2 className='text-gray-900 font-bold mb-4'>Social Links</h2>
//           <button
//             type='button'
//             className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
//             onClick={handleClose}
//           >
//             ✕
//           </button>
//         </div>
//         <div className='overflow-auto h-[500px]'>
//           <div className=''>
//             {selectedSocial && selectedSocial.length > 0 ? (
//               selectedSocial.map((social, index) => (
//                 <div key={index} className="relative mb-4">
//                   <input
//                     type="text"
//                     placeholder={`${social}.com/username`}
//                     value={socialLinks[social]}
//                     onChange={(e) => handleInputChange(e, social)}
//                     className={`w-full p-2 border rounded-lg ${errors[social] ? 'border-red-500' : ''}`}
//                   />
//                   {errors[social] && <p className="text-red-500 text-sm">{errors[social]}</p>}
//                   <button
//                     type="button"
//                     onClick={() => handleCancel(social)}
//                     className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500 mb-4">Select a social link to connect</p>
//             )}
//             <div className="space-y-4">
//               {Object.keys(socialLinks).map((social, index) => (
//                 <div
//                   key={index}
//                   className={`flex justify-between items-center px-4 py-2 border rounded-lg cursor-pointer ${selectedSocial.includes(social) ? 'bg-gray-100' : ''}`}
//                   onClick={() => handleSocialLinkSelect(social)}
//                 >
//                   <div className="flex flex-col">
//                     <span className="font-medium ">{social}</span>
//                     <span className="font-medium text-sm text-gray-500"> {selectedSocial.includes(social) ? 'tap to cancel' : 'tap to connect'} </span>
//                   </div>
//                   {selectedSocial.includes(social)
//                     ?
//                     <button className="text-black font-extrabold">✕</button>
//                     :
//                     <button className="text-black font-extrabold">＋</button>
//                   }
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <button
//           type='button'
//           className='h-8 px-2 mt-4 text-sm rounded-md bg-gray-700 text-white'
//           onClick={handleSubmit}
//         >
//           Save Socials
//         </button>
//       </div>
//     </div>

//   );
// };

// export default SocialLinksModal;



'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button'

const SocialLinksModal = ({ showModal, handleClose, handleFormSubmit, formData }) => {
  const initialSocialLinks = useMemo(() => ({
    instagram: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    threads: '',
    behance: '',
    dribbble: '',
    whatsapp: ''
  }), []);

  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData && formData.socialLinks) {
      const selected = Object.keys(formData.socialLinks);
      setSelectedSocial(selected);
      const updatedSocialLinks = {
        ...initialSocialLinks,
        ...formData.socialLinks
      };
      setSocialLinks(updatedSocialLinks);
    } else {
      setSelectedSocial([]);
      setSocialLinks(initialSocialLinks);
    }
  }, [formData, initialSocialLinks]);

  const handleInputChange = (e, social) => {
    setSocialLinks({ ...socialLinks, [social]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    selectedSocial.forEach(social => {
      if (!socialLinks[social]) {
        newErrors[social] = `${social} username is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const fullLinks = selectedSocial.reduce((acc, social) => {
        acc[social] = `${social}.com/${socialLinks[social]}`;
        return acc;
      }, {});
      handleFormSubmit(fullLinks);
      handleClose();
    }
  };

  const handleSocialLinkSelect = (social) => {
    if (selectedSocial.includes(social)) {
      setSelectedSocial(selectedSocial.filter(item => item !== social));
    } else {
      setSelectedSocial([...selectedSocial, social]);
    }
    setErrors({});
  };

  const handleCancel = (social) => {
    setSelectedSocial(selectedSocial.filter(item => item !== social));
    setSocialLinks({ ...socialLinks, [social]: '' });
    setErrors({});
  };

  if (!showModal) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex justify-center items-center'>
      <div className='w-full max-w-2xl max-h-full bg-white shadow-lg p-4 rounded-md'>
        <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
          <h2 className='text-gray-900 font-bold mb-4'>Social Links</h2>
          <button
            type='button'
            className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
        <div className='overflow-auto h-[500px]'>
          <div className=''>
            {selectedSocial && selectedSocial.length > 0 ? (
              selectedSocial.map((social, index) => (
                <div key={index} className="relative mb-4">
                  <input
                    type="text"
                    placeholder={`${social}.com/username`}
                    value={socialLinks[social]}
                    onChange={(e) => handleInputChange(e, social)}
                    className={`w-full p-2 border rounded-lg ${errors[social] ? 'border-red-500' : ''}`}
                  />
                  {errors[social] && <p className="text-red-500 text-sm">{errors[social]}</p>}
                  <button
                    type="button"
                    onClick={() => handleCancel(social)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mb-4">Select a social link to connect</p>
            )}
            <div className="space-y-4">
              {Object.keys(socialLinks).map((social, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-4 py-2 border rounded-lg cursor-pointer ${selectedSocial.includes(social) ? 'bg-gray-100' : ''}`}
                  onClick={() => handleSocialLinkSelect(social)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium ">{social}</span>
                    <span className="font-medium text-sm text-gray-500"> {selectedSocial.includes(social) ? 'tap to cancel' : 'tap to connect'} </span>
                  </div>
                  {selectedSocial.includes(social)
                    ?
                    <button className="text-black font-extrabold">✕</button>
                    :
                    <button className="text-black font-extrabold">＋</button>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button size='sm' onClick={handleSubmit}> Save Socials</Button>
      </div>
    </div>
  );
};

export default SocialLinksModal;


