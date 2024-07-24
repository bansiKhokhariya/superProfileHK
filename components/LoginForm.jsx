'use client';

import { useState, useContext } from 'react';
import { magic } from '../libs/magic';
import { UserContext } from '../libs/UserContext';

const LoginForm = ({ onClose, redirectUrl }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [user, setUser] = useContext(UserContext);

    const handleLoginWithEmail = async () => {
        try {
            setLoading(true);
            setDisabled(true);

            await magic.auth.loginWithMagicLink({ email, redirectURI: new URL(redirectUrl, window.location.origin).href, });

            const userMetadata = await magic.user.getMetadata();
            setUser(userMetadata);

            setLoading(false);
            onClose();
        } catch (error) {
            setDisabled(false);
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-200 z-50 flex justify-center items-center'>
            <div className=' bg-white shadow-lg p-4 rounded-md'>
                <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
                    <h2 className='text-gray-900 font-bold mb-4'>Login</h2>
                    <button
                        type='button'
                        className='h-8 px-2 mb-4 text-sm rounded-md bg-red-500 text-white'
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className=''>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border rounded-lg mb-4'
                    />
                    <button
                        onClick={handleLoginWithEmail}
                        disabled={disabled}
                        className='w-full h-8 px-2  text-sm rounded-md bg-gray-700 text-white'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
