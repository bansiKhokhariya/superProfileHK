import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { User } from 'lucide-react';
import { signOut } from "next-auth/react";
import { Button } from '@/components/ui/button'

const Setting = ({ formData, setFormData }) => {

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result, // Save the image data URL in formData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input change for name and bio
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.id,
          image: formData.image,
          name: formData.name,
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!formData.id) {
      alert('User ID is missing');
      return;
    }
    try {
      const response = await fetch(`/api/user?id=${formData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      signOut({ callbackUrl: "/api/auth/signin?callbackUrl=%2Fdashboard" });
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-xl mb-5">
        <div className="flex items-center gap-4">
          {formData?.image ? <Image
            src={formData?.image}
            width={80}
            height={80}
            className="rounded-full h-20 w-20"
            alt="logo"
          /> : <div className='border rounded-full bg-gray-200 p-1'>
            <User color="black" size={100} />
          </div>}
          <label htmlFor="imageUpload" className="cursor-pointer">
            <p className="py-1 px-3 border hover:bg-indigo-500 hover:text-white rounded-lg">Change</p>
            <input id="imageUpload" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData?.bio || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleProfileUpdate}>Update Profile</Button>
        </div>

      </div>
      <div className='bg-white p-6 rounded-xl'>
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <p className="text-gray-600 mt-2">
          Deleting your account permanently deletes your page and all your data.
        </p>
        <Button variant='destructive' className='mt-2' onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
    </>
  );
};

export default Setting;
