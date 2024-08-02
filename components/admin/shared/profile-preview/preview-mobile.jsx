import React from 'react';
import renderSocialIcon from '@/utils/renderSocialIcon';
import Image from 'next/image';
import { User } from 'lucide-react';
import { X } from 'lucide-react';


const PreviewMobile = ({ close, formData, setFormData }) => {

  const flattenedLinks = formData?.links?.flat();

  const handleLinkClick = async (index, url) => {
    window.open(url, '_blank');

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.id,
          linkIndex: index,
          incrementClicks: true,
          action: 'update',
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setFormData({ ...formData, links: data.user.links });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="absolute inset-0 z-10 flex justify-start items-center flex-col px-20 py-10 " style={{
        background: formData?.themePalette?.palette[0],
        color: formData?.themePalette?.palette[2]
      }}> 
          <div className="flex items-center gap-4">
            {formData?.image ? <Image
              src={formData?.image}
              width={40}
              height={40}
              className="rounded-full h-20 w-20"
              alt="logo"
            /> : <div className='border shadow-lg rounded-full bg-gray-200 p-1'>
              <User color="black" size={60} />
            </div>}
          </div>
          <div className='mt-3'>
            {formData?.name ? <p>{formData?.name}</p> : <p>{formData?.handle}</p>}
          </div>
          <p className='mt-2'>{formData?.bio}</p>

          {formData?.socialLinks && (
            <div className="flex flex-wrap mt-2">
              {Object.entries(formData.socialLinks).map(([platform, link], index) => (
                <a key={index} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="mx-0.5 text-gray-700 hover:text-gray-900">
                  {renderSocialIcon(platform)}
                </a>
              ))}
            </div>
          )}

          {flattenedLinks?.length > 0 ? (
            <div className='w-full flex flex-col gap-3 mt-4'>
              {flattenedLinks.map((link, index) => (
                <button key={index} onClick={() => handleLinkClick(index, link.url)}
                  style={{
                    background: formData?.themePalette?.palette[1],
                    border: `1px solid ${formData?.themePalette?.palette[3]}`,
                    borderRadius: formData?.buttonStyle === 'rounded-md'
                      ? '0.375rem'
                      : formData?.buttonStyle === 'rounded-full'
                        ? '9999px'
                        : formData?.buttonStyle === 'shadow-rounded'
                          ? '0.375rem'
                          : formData?.buttonStyle === 'shadow-rounded-full'
                            ? '9999px'
                            : '0',
                    boxShadow: formData?.buttonStyle === 'shadow'
                      ? '5px 5px'
                      : formData?.buttonStyle === 'shadow-rounded'
                        ? '5px 5px'
                        : formData?.buttonStyle === 'shadow-rounded-full'
                          ? '5px 5px'
                          : 'none',
                  }}
                  className="p-2 w-full"
                >
                  {link.title}
                </button>
              ))}
            </div>
          ) : (
            <p>No links available</p>
          )}


          <div className="rounded-full bottom-[1rem] absolute left-1/2 transform -translate-x-1/2 lg:hidden">
            <button
              onClick={close}
              style={{ background: `${formData?.themePalette?.palette[3]}` }}
              className="flex justify-center items-center w-[45px] h-[45px] rounded-full bg-gray-500 text-black text-center font-bold text-lg shadow-lg hover:bg-slate-600"
            >
              <X color={formData?.themePalette?.palette[0]} size={30} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PreviewMobile;
