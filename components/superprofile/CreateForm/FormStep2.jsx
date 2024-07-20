import React, { useState, useEffect } from 'react';
import FaqPopover from '../../FaqPopover';
import FaqTestimonialModal from '../../modal/FaqTestimonialModal';
import SocialLinksModal from '../../modal/SocialLinksModal';
import Image from 'next/image'
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
];

const FormStep2 = ({ formData, setFormData, errors, onFormDataChange }) => {
  const [content, setContent] = useState(formData.description || '');
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [faqIndex, setFaqIndex] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [faqFormData, setFaqFormData] = useState({ question: '', answer: '' });
  const [testimonialFormData, setTestimonialFormData] = useState({ name: '', comment: '' });
  const [editorConfig, setEditorConfig] = useState({
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
      insertImageAsBase64URI: true
    },
  });

  useEffect(() => {
    // Ensure editorConfig is defined only in the client-side
    if (typeof window !== 'undefined') {
      setEditorConfig(prevConfig => ({
        ...prevConfig,
        width: '100%',
        height: 400
      }));
    }
  }, []);

  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  const handleFaqModal = (index = null) => {
    if (index !== null) {
      setFaqFormData(formData.faqs[index]);
      setIsEditingFaq(true);
      setFaqIndex(index);
    } else {
      setFaqFormData({ question: '', answer: '' });
      setIsEditingFaq(false);
    }
    setFormFields([
      { id: 'question', label: 'Question', type: 'text', placeholder: 'Type your question here' },
      { id: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Type your answer here' },
    ]);
    setShowFaqModal(!showFaqModal);
  };

  const handleSocialModal = () => {
    setShowSocialModal(!showSocialModal)

  }

  const handleTestimonialModal = (index = null) => {
    if (index !== null) {
      setTestimonialFormData(formData.testimonials[index]);
      setIsEditingTestimonial(true);
      setTestimonialIndex(index);
    } else {
      setTestimonialFormData({ name: '', comment: '' });
      setIsEditingTestimonial(false);
    }
    setFormFields([
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Type your name here' },
      { id: 'comment', label: 'Comment', type: 'textarea', placeholder: 'Type your comment here' },
    ]);
    setShowTestimonialModal(!showTestimonialModal);
  };

  const handleDeleteFaq = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleDeleteTestimonial = (index) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData({ ...formData, testimonials: newTestimonials });
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (showFaqModal) {
      setFaqFormData({
        ...faqFormData,
        [id]: value,
      });
      setFormData({
        ...formData,
        [id]: value,
      });
    } else if (showTestimonialModal) {
      setTestimonialFormData({
        ...testimonialFormData,
        [id]: value,
      });
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      if (type === 'checkbox') {
        setFormData({
          ...formData,
          [id]: checked,
        });
      } else {
        setFormData({
          ...formData,
          [id]: value,
        });
      }
    }
  };

  const handleFaqSubmit = () => {
    const newFaq = { question: formData.question, answer: formData.answer };
    const updatedFaqs = formData.faqs ? [...formData.faqs] : [];
    if (isEditingFaq) {
      updatedFaqs[faqIndex] = newFaq;
    } else {
      updatedFaqs.push(newFaq);
    }
    setFormData({ ...formData, faqs: updatedFaqs });
    setShowFaqModal(false);
    setIsEditingFaq(false);
    setFaqIndex(null);
  };

  const handleTestimonialSubmit = () => {
    const newTestimonial = { name: formData.name, comment: formData.comment };
    const updatedTestimonial = formData.testimonials ? [...formData.testimonials] : [];
    if (isEditingTestimonial) {
      updatedTestimonial[testimonialIndex] = newTestimonial;
    } else {
      updatedTestimonial.push(newTestimonial);
    }
    setFormData({ ...formData, testimonials: updatedTestimonial });
    setShowTestimonialModal(false);
    setIsEditingTestimonial(false);
    setTestimonialIndex(null);
  };

  const handleSocialSubmit = (fullLinks) => {
    setFormData({
      ...formData,
      socialLinks: fullLinks
    });
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          coverfiles: {
            name: file.name,
            type: file.type,
            preview: reader.result, // Save preview URL if needed
          },
        }));
      };
      reader.readAsDataURL(file);
    });
  };


  const handleDeleteFile = () => {
    setFormData({
      ...formData,
      coverfiles: '',
      coverfilesPreview: '',
    });
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    handleInputChange({ target: { id: 'description', value: newContent } }); // Update formData with rich text editor content
  };

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <label className='font-bold'>Tell us about your page</label>
        <div className="mt-4">
          <label htmlFor="pagetitle" className="block mb-2 text-sm font-medium">Page Title</label>
          <input type="text" id="pagetitle" value={formData.pagetitle ?? ''} onChange={handleInputChange} className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" placeholder="Give your page title" />
          {errors.pagetitle && <p className="text-red-500 text-sm mt-1">{errors.pagetitle}</p>}
        </div>
        <div className='mt-4'>
          <label htmlFor="pageCategory" className="block mb-2 text-sm font-medium">Category</label>
          <select id="pageCategory" value={formData.pageCategory ?? ''} onChange={handleInputChange} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-pink-500 block w-full p-2.5 ">
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="jobs">Jobs</option>
            <option value="entertainement">Entertainement</option>
            <option value="travel">Travel</option>
            <option value="art_carfts">Art & Crafts</option>
            <option value="fitness_wellness">Fitness & wellness</option>
            <option value="home_wellness">Home & wellness</option>
            <option value="fiction_wellness">Fiction & wellness</option>
            <option value="comedy">Comedy</option>
            <option value="history_cluture">History & Cluture</option>
            <option value="theatre">Theatre</option>
            <option value="environement">Environement</option>
            <option value="relationships">Relationships</option>
            <option value="marketing">Marketing</option>
            <option value="fitness">Fitness</option>
            <option value="business">Business</option>
            <option value="photography">Photography</option>
            <option value="news_politics">News and Politics</option>
            <option value="astrology">Astrology</option>
            <option value="beauty_makeup">Beauty and Makeup</option>
            <option value="cartoons">Cartoons</option>
            <option value="crypto">Crypto</option>
            <option value="dance">Dance</option>
            <option value="design">Design</option>
            <option value="fashion_lifestyle">Fashion & Lifestyle</option>
            <option value="gaming">Gaming</option>
            <option value="health">Health</option>
            <option value="hobbies">Hobbies</option>
            <option value="mentorship">Mentorship</option>
            <option value="motivation">Motivation</option>
            <option value="music">Music</option>
            <option value="non_profit">Non-profit</option>
            <option value="parenting">Parenting</option>
            <option value="pets_animals">Pets & Animals</option>
            <option value="religion">Religion</option>
            <option value="spirituality">Spirituality</option>
            <option value="startups">Startups</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className='mt-4'>
          <label className="block mb-2 text-sm font-medium">Cover Image/Video</label>
          {!formData.coverfiles && (
            <div className='border-dashed border-2 border-light-blue-500 p-4 mt-4'>
              <label htmlFor="coverfiles" className="flex flex-col items-center justify-center w-full cursor-pointer ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="text-sm "><span className="text-pink-500">Browse </span> files from your system</p>
                  <p className='text-xs text-gray-500'>1280 x 720 (16:9) recommended</p>
                </div>
                <input id="coverfiles" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          )}
          {errors.coverfiles && <p className="text-red-500 text-sm mt-1">{errors.coverfiles}</p>}
          {formData.coverfiles && (
            <div className="mt-4 overflow-x-auto">
              <h2 className="text-sm">Uploads:</h2>
              <div className="flex items-center justify-between gap-1 p-1 rounded-lg mt-2">
                <div className='flex gap-2 items-center'>
                  <Image src={formData && formData.coverfiles && formData.coverfiles.preview || "/images/defaultImage.webp"} width={40} height={40} alt="CoverFiles" className='h-12 w-12 rounded-md' />
                  <div className='text-sm'>
                    <p>{formData.coverfiles.name}</p>
                  </div>
                </div>
                <button onClick={handleDeleteFile}>
                  <Image src="/svg/delete.svg" width={24} height={24} alt="Delete svg" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
          <div className="App" style={{ maxWidth: editorConfig.width, margin: "0 auto" }}>
            <JoditEditor
              value={content}
              config={editorConfig}
              onChange={handleEditorChange}
            />
          </div>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="buttonText" className="block mb-2 text-sm font-medium">Button Text</label>
          <input type="text" id="buttonText" value={formData.buttonText ?? 'Make Payment'} onChange={handleInputChange} className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-500 block w-full p-2.5" placeholder="Make Payment" />
          {errors.buttonText && <p className="text-red-500 text-sm mt-1">{errors.buttonText}</p>}
        </div>
      </div>
      <div className=''>
        <label className='font-bold'>Sections</label>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='border rounded shadow p-3 w-full flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-bold'>Frequently Asked Questions (FAQs)</p>
              <label className="switch">
                <input type="checkbox" className='customToggle' id='faqsViewToggle' checked={formData.faqsViewToggle ?? ''}
                  onChange={handleInputChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className='p-4'>
              {formData && formData.faqs && formData.faqs.length !== 0 && <div className="overflow-x-auto">
                <div className="mt-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-2 mt-2">
                      <div className='flex justify-between'>
                        <h3 className='text-base font-medium'>{faq.question}</h3>
                        <FaqPopover onEdit={() => handleFaqModal(index)}
                          onDelete={() => handleDeleteFaq(index)} />
                      </div>
                      <p className='text-gray-500 text-sm'>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
            <div>
              <p className='text-sm font-bold text-pink-500 cursor-pointer' onClick={() => handleFaqModal()}>+ Add Question</p>
            </div>
          </div>
          <div className='border rounded shadow p-3 w-full flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-bold'>Testimonials</p>
              <label className="switch">
                <input type="checkbox" className='customToggle' id='testimonialsViewToggle' checked={formData.testimonialsViewToggle ?? ''}
                  onChange={handleInputChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className='p-4'>
              {formData && formData.testimonials && formData.testimonials.length !== 0 && <div className="overflow-x-auto">
                <div className="mt-4">
                  {formData.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-b pb-2 mt-2">
                      <div className='flex justify-between'>
                        <h3 className='text-base font-medium'>{testimonial.name}</h3>
                        <FaqPopover onEdit={() => handleTestimonialModal(index)}
                          onDelete={() => handleDeleteTestimonial(index)} />
                      </div>
                      <p className='text-gray-500 text-sm'>{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
            <div>
              <p className='text-sm font-bold text-pink-500 cursor-pointer' onClick={() => handleTestimonialModal()}>+ Add Testimonial</p>
            </div>
          </div>
          <div className='border rounded shadow p-3 w-full flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-bold'>Social Links</p>
              <label className="switch">
                <input type="checkbox" className='customToggle' id='socialLinksViewToggle' checked={formData.socialLinksViewToggle ?? ''}
                  onChange={handleInputChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className='p-4'>
              {formData && formData.socialLinks && Object.keys(formData.socialLinks).length !== 0 && (
                <div className="overflow-x-auto">
                  <div className="mt-4">
                    {Object.keys(formData.socialLinks).map((socialLink, index) => (
                      <div key={index} className="border-b pb-2 mt-2">
                        <div className='flex justify-between'>
                          <h3 className='text-base font-medium'>{socialLink}</h3>
                          <p>{formData.socialLinks[socialLink]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className='text-sm font-bold text-pink-500 cursor-pointer' onClick={() => handleSocialModal()}>+ Add/Edit Social Links</p>
            </div>
          </div>
        </div>
      </div>
      <FaqTestimonialModal
        showModal={showFaqModal || showTestimonialModal}
        handleClose={() => {
          setShowFaqModal(false);
          setShowTestimonialModal(false);
        }}
        formData={showFaqModal ? faqFormData : testimonialFormData}
        formFields={formFields}
        handleInputChange={handleInputChange}
        handleFormSubmit={showFaqModal ? handleFaqSubmit : handleTestimonialSubmit}
        title={showFaqModal ? 'Add/Edit FAQ' : 'Add/Edit Testimonial'}
      />
      <SocialLinksModal
        showModal={showSocialModal}
        handleClose={() => { setShowSocialModal(false) }}
        handleFormSubmit={handleSocialSubmit}
        formData={formData}
      />
    </div>
  );
};

export default FormStep2;
