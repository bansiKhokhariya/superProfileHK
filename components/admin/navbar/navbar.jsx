'use client';
import { Copy } from 'lucide-react';
import React from 'react';
import HandleDialog from '@/components/modal/HandleDialog';

const items = [
    {
        title: 'Profile',
        key: 'profile',
    },
    {
        title: 'Appearance',
        key: 'appearance',
    },
    {
        title: 'Analytics',
        key: 'analytics',
    },
    {
        title: 'Settings',
        key: 'settings',
    },
];

const Navbar = ({ user, formData, loading, handleTabClick, handleCopyLink, setIsDialogOpen, isDialogOpen, activeTab }) => {
    return (
        <>
            <div className="sticky top-0 border-b border-b-indigo-500 bg-white">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-3 md:gap-6 items-center">
                        {items.map((item) => (
                            <nav key={item.title} className="rounded-xl">
                                <div
                                    onClick={() => handleTabClick(item.key)}
                                    className={`py-5  ${activeTab === item.key ? ' border-b-4 border-indigo-500' : ''} cursor-pointer`}
                                >
                                    <span className={`text-sm ${activeTab === item.key ? 'text-indigo-500' : 'text-black'}`}>{item.title}</span>
                                </div>
                            </nav>
                        ))}
                    </div>
                    <nav className="rounded-xl">
                        <div
                            onClick={handleCopyLink}
                            className={`bg-transparent p-2 flex space-x-2 items-center hover:bg-slate-100 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            aria-disabled={loading}
                        >
                            <Copy color="black" size={18} />
                            <span className='sm:block hidden'>Copy Link</span>
                        </div>
                    </nav>
                </div>
            </div>
            <HandleDialog user={user} formData={formData} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
};

export default Navbar;
