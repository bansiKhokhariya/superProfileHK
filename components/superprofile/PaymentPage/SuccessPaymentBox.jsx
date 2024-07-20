// import React, { useEffect } from 'react'
// import ButtonSignin from '@/components/ButtonSignin'
// import { useSession } from "next-auth/react";

// const SuccessPaymentBox = ({ setProductViewPage, setPaymentSuccess }) => {
//     const { data: session } = useSession();
//     useEffect(() => {
//         if (!session?.user) {
//             localStorage.setItem('loginPaymentBox', 'true');
//         }
//     }, [session?.user]);

//     const handleViewProductClick = () => {
//         localStorage.removeItem('loginPaymentBox');
//         setProductViewPage(true);
//         setPaymentSuccess(false);
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
//             <div className="text-center gap-3 pt-10 pb-5 px-20 bg-white rounded border-t-4 border-green-500 flex flex-col justify-center items-center ">
//                 <div className='h-16 w-16 bg-green-400 flex items-center justify-center rounded-full' style={{ marginTop: "-70px" }} >
//                     <p className='text-[30px] text-white font-bold'>✓</p>
//                 </div>
//                 <p>Payment Successfull</p>
//                 {!session?.user ? <ButtonSignin /> :
//                     <>
//                         <button className='bg-pink-500 text-white py-2 px-4 rounded-lg text-sm' onClick={handleViewProductClick}>View Product</button>
//                     </>
//                 }
//             </div>
//         </div>
//     )
// }

// export default SuccessPaymentBox


import React, { useEffect, useState } from 'react';
import ButtonSignin from '@/components/ButtonSignin';
import { useSession } from "next-auth/react";

const SuccessPaymentBox = ({ setProductViewPage, setPaymentSuccess }) => {
    const { data: session } = useSession();
    const [showCrackers, setShowCrackers] = useState(true);

    useEffect(() => {
        if (!session?.user) {
            localStorage.setItem('loginPaymentBox', 'true');
        }
    }, [session?.user]);

    const handleViewProductClick = () => {
        localStorage.removeItem('loginPaymentBox');
        setProductViewPage(true);
        setPaymentSuccess(false);
    };

    const generateCrackers = () => {
        const colors = ['gold', 'red', 'blue', 'green', 'purple', 'orange'];
        const crackers = [];
        for (let i = 0; i < 20; i++) {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animationDelay = Math.random() * 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            crackers.push(
                <div
                    key={i}
                    className="cracker"
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        animationDelay: `${animationDelay}s`,
                        backgroundColor: color,
                    }}
                ></div>
            );
        }
        return crackers;
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            {showCrackers && generateCrackers()}
            <div className="text-center gap-3 pt-10 pb-5 px-20 bg-white rounded border-t-4 border-green-500 flex flex-col justify-center items-center ">
                <div className='h-16 w-16 bg-green-400 flex items-center justify-center rounded-full' style={{ marginTop: "-70px" }} >
                    <p className='text-[30px] text-white font-bold'>✓</p>
                </div>
                <p>Payment Successful</p>
                {!session?.user ? (
                    <ButtonSignin />
                ) : (
                    <button className='bg-pink-500 text-white py-2 px-4 rounded-lg text-sm' onClick={handleViewProductClick}>
                        View Product
                    </button>
                )}
            </div>
        </div>
    )
}

export default SuccessPaymentBox;
