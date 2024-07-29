'use client'
import React, { useState } from 'react';
import Link from 'next/link'

const Sidebar = ({ CurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState('');

    return (
        <div className="flex min-h-screen">
            <div className={`fixed z-10 inset-y-0 left-0 bg-indigo-900 text-white p-5 transition-transform transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:flex w-64`}>
                <button className="md:hidden mb-4" onClick={() => setIsOpen(false)}>Close</button>
                <nav className='w-full flex gap-3 flex-col'>
                    <div className='border-b border-gray-400 py-1'>
                        <Link href={'/profile'}>
                            <div
                                className={`block py-2 px-3 rounded ${selectedPage === 'profile' ? '' : 'hover:bg-indigo-700'}`}>
                                Profile
                            </div>
                        </Link>
                    </div>
                    <div className='flex gap-3 flex-col py-1'>
                        <p className='text-xs px-3'>YOUR APPS</p>
                        <Link href={'/app/payment-page'}>
                            <div
                                className={`block py-2 px-3 rounded ${selectedPage === 'payment-page' ? '' : 'hover:bg-indigo-700'}`}>
                                Payment Pages
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-200 p-4 md:hidden">
                    <button onClick={() => setIsOpen(true)}>Menu</button>
                </header>
                <main className="flex-1 bg-gray-100">
                    {CurrentPage && <CurrentPage />}
                </main>
            </div>
        </div>
    );
};

export default Sidebar;
