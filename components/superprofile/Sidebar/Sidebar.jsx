'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import ButtonAccount from '@/components/ButtonAccount'
import { signOut } from "next-auth/react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Menu, X } from 'lucide-react';

const Sidebar = ({ CurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState('');
    return (
        <div className="flex min-h-screen">
            <div className={`fixed z-10 inset-y-0 left-0 bg-indigo-900 text-white p-5 transition-transform transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:flex w-64`}>
                <X className="md:hidden mb-4" color="white" onClick={() => setIsOpen(false)} size={20} />
                <nav className='w-full flex gap-3 flex-col justify-between'>
                    <div className='flex gap-3 flex-col'>
                        <div className='border-b border-gray-400 py-1'>
                            <Link href={'/create_super_profile'}>
                                <div
                                    className={`block py-2 px-3 rounded bg-indigo-500 ${selectedPage === 'profile' ? '' : 'hover:bg-indigo-700'}`}>
                                    Profile
                                </div>
                            </Link>
                        </div>
                        <div className='flex gap-3 flex-col py-1'>
                            <p className='text-xs px-3'>YOUR APPS</p>
                            <Link href={'/app/payment-page'}>
                                <div
                                    className={`block py-2 px-3 rounded bg-indigo-500 ${selectedPage === 'payment-page' ? '' : 'hover:bg-indigo-700'}`}>
                                    Payment Pages
                                </div>
                            </Link>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <div
                                className={`block py-2 px-3 rounded bg-indigo-700`}>
                                Settings
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <ul>
                                <li className="hover:bg-red-300 px-4 py-2 text-start text-sm cursor-pointer" onClick={() => { signOut({ callbackUrl: "/api/auth/signin?callbackUrl=%2Fdashboard" }); }} >Logout</li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </nav>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-200 p-4 md:hidden">
                    <Menu color="black" onClick={() => setIsOpen(true)} size={20} />
                </header>
                <main className="flex-1 bg-gray-100">
                    {CurrentPage && <CurrentPage />}
                </main>
            </div>
        </div>
    );
};

export default Sidebar;
