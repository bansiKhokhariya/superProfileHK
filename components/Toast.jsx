import { useState, useEffect } from 'react';

const Toast = ({ message }) => {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
        }, 5000); // Adjust duration as needed (in milliseconds)

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md transition-opacity ${showToast ? 'opacity-100' : 'opacity-0'}`}>
            {message}
        </div>
    );
};

export default Toast;
