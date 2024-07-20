import Image from 'next/image';

const renderSocialIcon = (platform) => {
    switch (platform) {
        case 'facebook':
            return <Image src='/svg/facebook.svg' width={20} height={20} className='rounded' alt='facebook' />;
        case 'twitter':
            return <Image src='/svg/twitter.svg' width={20} height={20} className='rounded' alt='twitter' />;
        case 'instagram':
            return <Image src='/svg/instagram.svg' width={20} height={20} className='rounded' alt='instagram' />;
        case 'linkedin':
            return <Image src='/svg/linkedin.svg' width={20} height={20} className='rounded' alt='linkedin' />;
        case 'youtube':
            return <Image src='/svg/youtube.svg' width={20} height={20} className='rounded' alt='youtube' />;
        case 'threads':
            return <Image src='/svg/threads.svg' width={20} height={20} className='rounded' alt='threads' />;
        case 'behance':
            return <Image src='/svg/behance.svg' width={20} height={20} className='rounded' alt='behance' />;
        case 'dribbble':
            return <Image src='/svg/dribbble.svg' width={20} height={20} className='rounded' alt='dribbble' />;
        case 'whatsapp':
            return <Image src='/svg/whatsapp.svg' width={20} height={20} className='rounded' alt='whatsapp' />;
        default:
            return null; // Add more cases as needed
    }
};

export default renderSocialIcon;
