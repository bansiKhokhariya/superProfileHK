'use client';

import { useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { magic } from '../libs/magic';
import { UserContext } from '../libs/UserContext';
import { useRouter } from 'next/navigation';

const AccountButtonLogin = () => {
    const [user, setUser] = useContext(UserContext);
    const router = useRouter();

    const handleLogout = async () => {
        await magic.user.logout();
        setUser(null);
        router.push('/');
    };

    const getFirstLetterFromEmail = (email) => {
        if (!email || typeof email !== 'string') return '';
        const shortName = email.split('@')[0];
        return shortName.charAt(0).toUpperCase();
    };

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className="btn bg-gray-200">
                        {getFirstLetterFromEmail(user.email) || 'Account'}
                    </Popover.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Popover.Panel className="absolute z-10 mt-3 transform">
                            <div className="rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1  px-4 bg-white">
                                <div className="space-y-2">
                                    <button onClick={handleLogout} className="w-full text-left text-sm text-red-500">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default AccountButtonLogin;
