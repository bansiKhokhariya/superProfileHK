"use client";
import React from 'react';
import { Popover, Transition } from "@headlessui/react";

interface FaqPopoverProps {
    onEdit: () => void;
    onDelete: () => void;
}

const FaqPopover: React.FC<FaqPopoverProps> = ({ onEdit, onDelete }) => {
    return (
        <Popover className="relative z-10">
            <>
                <Popover.Button className="focus:outline-none">
                    <b className="text-xl">⋮</b>
                </Popover.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Popover.Panel className="absolute right-2 z-10 mt-3 w-50 transform bg-white">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-base-content ring-opacity-5">
                            <ul>
                                <li onClick={onEdit} className="hover:bg-gray-100 px-4 py-2 text-start text-sm">Edit</li>
                                <li onClick={onDelete} className="hover:bg-gray-100 px-4 py-2 text-start text-sm text-red-500">Delete</li>
                            </ul>
                        </div>
                    </Popover.Panel>
                </Transition>
            </>
        </Popover>
    );
};

export default FaqPopover;
