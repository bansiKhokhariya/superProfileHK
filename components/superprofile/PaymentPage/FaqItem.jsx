import React, { useState, useRef } from 'react';
import Image from 'next/image';

const FaqItem = ({ item }) => {
    const accordion = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button
                className="flex flex-col gap-1 w-full px-2 pt-2 pb-1 border rounded"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                aria-expanded={isOpen}
            >
                <div className='flex items-center justify-between w-full'>
                    <span className={`text-sm font-bold`}>{item?.question}</span>
                    <svg
                        className={`flex-shrink-0 w-2 h-2 ml-auto fill-current`}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center transition duration-200 ease-out ${isOpen && "rotate-180"}`}
                        />
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen && "rotate-180 hidden"}`}
                        />
                    </svg>
                </div>
                <div
                    ref={accordion}
                    className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                    style={
                        isOpen
                            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
                            : { maxHeight: 0, opacity: 0 }
                    }
                >
                    <div className="text-left text-xs mb-1">{item?.answer}</div>
                </div>
            </button>
        </li>
    );
};

export default FaqItem;
