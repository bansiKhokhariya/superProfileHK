import React from 'react';
import Main from '@/components/superprofile/CreateForm/Main';

const Page = ({ params }) => {

    return (
        <>
            <Main productId={params.productId}/>
        </>
    );
};

export default Page;
