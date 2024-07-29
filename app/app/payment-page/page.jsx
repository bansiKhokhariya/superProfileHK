import React from 'react'
import Sidebar from '@/components/superprofile/Sidebar/Sidebar';
import Main from '@/components/superprofile/listData/Main';

const page = () => {
    return (
        <Sidebar CurrentPage={Main} />
    )
}

export default page