// 'use client';
// import React, { useEffect, useState } from 'react';
// import { User, X } from 'lucide-react';
// import renderSocialIcon from '@/utils/renderSocialIcon';
// import Script from 'next/script';

// const Page = ({ params }) => {
//     const [formData, setFormData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Function to fetch data from the API
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`/api/links?handle=${params.handle}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data');
//                 }
//                 const data = await response.json();
//                 setFormData(data.user); // Save response data to formData
//             } catch (err) {
//                 console.error('Error fetching user data:', err);
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [params.handle]); // Dependency array ensures fetch runs when handle changes

//     const flattenedLinks = formData?.links?.flat();

//     const handleLinkClick = async (index, url, type = 'link', platform) => {
//         // Open the link in a new tab
//         window.open(url, '_blank');
//         try {
//             const response = await fetch('/api/links', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     userId: formData.id,
//                     [type === 'link' ? 'linkIndex' : 'platform']: type === 'link' ? index : platform,
//                     incrementClicks: true,
//                     action: type === 'link' ? 'update' : 'updateSocialLinkClicks',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Something went wrong');
//             }

//             const data = await response.json();
//             setFormData(data.user); // Ensure formData is updated with latest data
//         } catch (error) {
//             console.error('Error updating click count:', error.message);
//             alert('Failed to update click count.');
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <div
//                 className="absolute inset-0 z-10 flex justify-start items-center flex-col px-5 sm:px-8 md:px-16 lg:px-[300px] xl:px-[500px] py-10"
//                 style={{
//                     background: formData?.themePalette?.palette[0],
//                     color: formData?.themePalette?.palette[2],
//                 }}
//             >
//                 <div className="flex items-center gap-4">
//                     {formData?.image ? (
//                         <img
//                             src={formData?.image}
//                             width={40}
//                             height={40}
//                             className="rounded-full h-20 w-20"
//                             alt="logo"
//                         />
//                     ) : (
//                         <div className="border shadow-lg rounded-full bg-gray-200 p-1">
//                             <User color="black" size={60} />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mt-3 text-center">
//                     {formData?.name ? <p>{formData?.name}</p> : <p>{formData?.handle}</p>}
//                 </div>
//                 <p className="mt-2 text-center">{formData?.bio}</p>



//                 {formData?.socialLinks && (
//                     <div className="flex flex-wrap mt-2">
//                         {Object.entries(formData.socialLinks).map(([platform, { url, clicks }], index) => (
//                             <a
//                                 key={index}
//                                 href={`https://${url}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     handleLinkClick(index, `https://${url}`, 'social', platform);
//                                 }}
//                                 className="mx-0.5 text-gray-700 hover:text-gray-900"
//                             >
//                                 {renderSocialIcon(platform)}
//                             </a>
//                         ))}
//                     </div>
//                 )}

//                 {flattenedLinks?.length > 0 ? (
//                     <div className="w-full flex flex-col gap-3 mt-4">
//                         {flattenedLinks.map((link, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => handleLinkClick(index, link.url)}
//                                 style={{
//                                     background: formData?.themePalette?.palette[1],
//                                     border: `1px solid ${formData?.themePalette?.palette[3]}`,
//                                     borderRadius:
//                                         formData?.buttonStyle === 'rounded-md'
//                                             ? '0.375rem'
//                                             : formData?.buttonStyle === 'rounded-full'
//                                                 ? '9999px'
//                                                 : formData?.buttonStyle === 'shadow-rounded'
//                                                     ? '0.375rem'
//                                                     : formData?.buttonStyle === 'shadow-rounded-full'
//                                                         ? '9999px'
//                                                         : '0',
//                                     boxShadow:
//                                         formData?.buttonStyle === 'shadow'
//                                             ? `5px 5px ${formData?.themePalette?.palette[3]}`
//                                             : formData?.buttonStyle === 'shadow-rounded'
//                                                 ? `5px 5px ${formData?.themePalette?.palette[3]}`
//                                                 : formData?.buttonStyle === 'shadow-rounded-full'
//                                                     ? `5px 5px ${formData?.themePalette?.palette[3]}`
//                                                     : 'none',
//                                 }}
//                                 className="p-2 w-full"
//                             >
//                                 {link.title}
//                             </button>
//                         ))}
//                     </div>
//                 ) : (
//                     <p>No links available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Page;












'use client';
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import renderSocialIcon from '@/utils/renderSocialIcon';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Page = ({ params }) => {

    const { query } = useRouter();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/links?handle=${params.handle}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setFormData(data.user); // Save response data to formData
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.handle]); // Dependency array ensures fetch runs when handle changes

    const flattenedLinks = formData?.links?.flat();

    const handleLinkClick = async (index, url, type = 'link', platform) => {
        // Open the link in a new tab
        window.open(url, '_blank');
        try {
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: formData.id,
                    [type === 'link' ? 'linkIndex' : 'platform']: type === 'link' ? index : platform,
                    incrementClicks: true,
                    action: type === 'link' ? 'update' : 'updateSocialLinkClicks',
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            setFormData(data.user); // Ensure formData is updated with latest data
        } catch (error) {
            console.error('Error updating click count:', error.message);
            alert('Failed to update click count.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Head>
                <title> @{formData.handle} | HKSUPERPROFILE</title>
            </Head>
            {/* {!query?.isIframe ? ( */}
            <Script defer
                src="https://unpkg.com/@tinybirdco/flock.js"
                data-host="https://api.tinybird.co"
                data-token="p.eyJ1IjogImVkOTgwZGM3LTc3M2YtNDBkYy1hZmU5LTU0Y2VhNDMzYmFlYyIsICJpZCI6ICI3OGRkNmU1ZC01ZmNkLTQxNzctODYwNC00MWE4ZDg2MzY3YzUiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.4zM2j63lNeurkZla70fbLUcmQYSU-ye7vU2fJIn1Nv0"
            />
            {/* ) : null} */}
            <div
                className="absolute inset-0 z-10 flex justify-start items-center flex-col px-5 sm:px-8 md:px-16 lg:px-[300px] xl:px-[500px] py-10"
                style={{
                    background: formData?.themePalette?.palette[0],
                    color: formData?.themePalette?.palette[2],
                }}
            >
                <div className="flex items-center gap-4">
                    {formData?.image ? (
                        <img
                            src={formData?.image}
                            width={40}
                            height={40}
                            className="rounded-full h-20 w-20"
                            alt="logo"
                        />
                    ) : (
                        <div className="border shadow-lg rounded-full bg-gray-200 p-1">
                            <User color="black" size={60} />
                        </div>
                    )}
                </div>
                <div className="mt-3 text-center">
                    {formData?.name ? <p>{formData?.name}</p> : <p>{formData?.handle}</p>}
                </div>
                <p className="mt-2 text-center">{formData?.bio}</p>

                {formData?.socialLinks && (
                    <div className="flex flex-wrap mt-2">
                        {Object.entries(formData.socialLinks).map(([platform, { url, clicks }], index) => (
                            <a
                                key={index}
                                href={`https://${url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(index, `https://${url}`, 'social', platform);
                                }}
                                className="mx-0.5 text-gray-700 hover:text-gray-900"
                            >
                                {renderSocialIcon(platform)}
                            </a>
                        ))}
                    </div>
                )}

                {flattenedLinks?.length > 0 ? (
                    <div className="w-full flex flex-col gap-3 mt-4">
                        {flattenedLinks.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => handleLinkClick(index, link.url)}
                                style={{
                                    background: formData?.themePalette?.palette[1],
                                    border: `1px solid ${formData?.themePalette?.palette[3]}`,
                                    borderRadius:
                                        formData?.buttonStyle === 'rounded-md'
                                            ? '0.375rem'
                                            : formData?.buttonStyle === 'rounded-full'
                                                ? '9999px'
                                                : formData?.buttonStyle === 'shadow-rounded'
                                                    ? '0.375rem'
                                                    : formData?.buttonStyle === 'shadow-rounded-full'
                                                        ? '9999px'
                                                        : '0',
                                    boxShadow:
                                        formData?.buttonStyle === 'shadow'
                                            ? `5px 5px ${formData?.themePalette?.palette[3]}`
                                            : formData?.buttonStyle === 'shadow-rounded'
                                                ? `5px 5px ${formData?.themePalette?.palette[3]}`
                                                : formData?.buttonStyle === 'shadow-rounded-full'
                                                    ? `5px 5px ${formData?.themePalette?.palette[3]}`
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
            </div>
        </>
    );
};

export default Page;
