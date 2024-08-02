
'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const HandleDialog = ({ user, isOpen, onClose }) => {
    const [handle, setHandle] = useState('');

    const handleSave = async () => {
        if (!handle.trim()) {
            toast.error("Handle cannot be empty.");
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    handle
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`${handle} is yours`);
                onClose();
            } else {
                toast.error(data.message || "Error updating handle.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating handle.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex justify-center items-center'>
            <div className='w-full max-w-xl bg-white shadow-lg p-4 rounded-md'>
                <div className='border-b border-gray-300 flex justify-between items-center mb-4'>
                    <h2 className='text-gray-900 font-bold mb-4'>Claim your unique handle</h2>
                </div>
                <label htmlFor='handle' className="block mb-2 text-sm font-medium">
                    Type your handle
                </label>
                <input
                    type="text"
                    id='handle'
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="border text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-2.5"
                />
                <div className='flex gap-2 mt-3'>
                    <Button size='sm' onClick={handleSave}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default HandleDialog;
