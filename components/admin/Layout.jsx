'use client';
import React, { useContext, useEffect, useState } from 'react';
import Preview from './shared/profile-preview/preview';
import PreviewBtn from './shared/profile-preview/previewbtn';
import Navbar from './navbar/navbar';
import Analytics from './Analytics';
import Appearance from './Appearance';
import Profile from './Profile';
import Setting from './Setting';
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';

const Layout = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            setUser(session.user);
        }
    }, [session, status]);

    const handleTabClick = (key) => {
        setActiveTab(key)
    };

    const handleCopyLink = () => {
        if (formData?.handle) {
            const url = `${window.location.origin}/${formData?.handle}`;
            navigator.clipboard.writeText(url).then(() => {
                toast.success("Link copied to clipboard!");
            }).catch(err => {
                toast.error("Failed to copy the link.");
            });
        } else {
            toast.error("Handle not set.");
        }
    };

    useEffect(() => {
        const checkUserHandle = async () => {
            if (user?.email) {
                try {
                    const response = await fetch('/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.email,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const userData = await response.json();

                    setFormData(userData.user);
                    if (!userData.user.handle) {
                        setIsDialogOpen(true);
                    }
                } catch (error) {
                    console.error(error);
                    // toast.error("Error checking user handle.");
                }
            }
            setLoading(false);
        };
        checkUserHandle();
    }, [user]);

    return (
        <>
            <section className="w-full" style={{ height: "100dvh" }}>
                <Navbar
                    user={user}
                    formData={formData}
                    loading={loading}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    handleCopyLink={handleCopyLink}
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                />
                <main className="flex w-full ">
                    <div className="py-10 px-5 md:px-10 lg:px-10  overflow-y-auto w-full border-r-4 border-indigo-500" style={{ height: "calc(100dvh - 65px)" }}>
                        {activeTab === 'profile' && <Profile formData={formData} setFormData={setFormData} />}
                        {activeTab === 'appearance' && <Appearance formData={formData} setFormData={setFormData} />}
                        {activeTab === 'analytics' && <Analytics />}
                        {activeTab === 'settings' && <Setting formData={formData} setFormData={setFormData} />}
                    </div>
                    {activeTab !== 'analytics' && (
                        <div className="hidden lg:flex w-1/2 items-center justify-center">
                            <Preview formData={formData} setFormData={setFormData} />
                        </div>
                    )}
                    <PreviewBtn formData={formData} setFormData={setFormData} />
                </main>
            </section>
        </>
    );
};

export default Layout;
