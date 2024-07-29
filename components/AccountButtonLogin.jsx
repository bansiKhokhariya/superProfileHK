'use client';
import { useContext } from 'react';
import { magic } from '../libs/magic';
import { UserContext } from '../libs/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


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
        <Popover>
            <PopoverTrigger><Button variant='outline' className='text-white'>{getFirstLetterFromEmail(user.email) || 'Account'}</Button></PopoverTrigger>
            <PopoverContent>
                <Button variant='destructive' size='sm' onClick={handleLogout}>Logout</Button>
            </PopoverContent>
        </Popover>
    );
};

export default AccountButtonLogin;