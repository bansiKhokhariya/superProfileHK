
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import SocialLinksModal from '../modal/SocialLinksProfileModal'; // Import the SocialLinksModal component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import Image from 'next/image'
import isUrl from 'is-url';

const Profile = ({ formData, setFormData }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const linksObject = {
        title,
        url,
        clicks: 0,
        archive: false
      };

      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedLink: linksObject, userId: formData.id, action: 'add', name: "bansi" }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      toast.success('Link created successfully!')
      setTitle('');
      setUrl('');

      setFormData({ ...formData, links: data.user.links });
      setShowLinkModal(false);
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async () => {
    setIsSubmitting(true);

    try {
      const updatedLinks = [...formData.links];
      updatedLinks[editIndex] = { title, url };

      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkIndex: editIndex, updatedLink: { title, url }, userId: formData.id, action: 'edit' }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Link updated successfully!')
      setTitle('');
      setUrl('');
      setFormData({ ...formData, links: updatedLinks });
      setEditIndex(null);
      setShowLinkModal(false);
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async (index) => {
    try {
      const link = formData.links[index];
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.id,
          linkIndex: index,
          archive: !link.archive,
          action: 'update',
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setFormData({ ...formData, links: data.user.links });
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkIndex: index, userId: formData.id, action: 'delete' }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setFormData({ ...formData, links: data.user.links });
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleSocialFormSubmit = async (socialLinks) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socialLinks, userId: formData.id, action: 'update' }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      toast.success('Social links updated successfully!')
      setFormData({ ...formData, socialLinks: data.user.socialLinks });
      setShowSocialModal(false);
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
        toast.error('Failed to copy URL.');
      });
  };

  const validateLink = (url) => {
    if (!isUrl(url)) {
      setUrlError('Enter a valid link');
    } else {
      setUrlError('');
    }
  };

  const handleUrlChange = (e) => {
    const newLink = e.target.value;
    setUrl(newLink);
    validateLink(newLink);
  };

  return (
    <div className='bg-white p-5 rounded-xl flex flex-col gap-4 items-center'>
      <div className='border rounded-full bg-gray-200 p-1'>
        {formData?.image ? <Image
          src={formData?.image}
          width={80}
          height={80}
          className="rounded-full h-20 w-20"
          alt="logo"
        /> : <div className='border rounded-full bg-gray-200 p-1'>
          <User color="black" size={100} />
        </div>}
      </div>
      <div className='flex gap-5'>
        <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowLinkModal(true)}>+ Add Link</Button>
          </DialogTrigger>
          <DialogContent className='bg-white'>
            <DialogHeader>
              <DialogTitle>{editIndex !== null ? 'Edit Link' : 'Create a new Link'}</DialogTitle>
              <DialogDescription>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='mt-4 mb-4'
                  required
                />
                <Input
                  type="text"
                  placeholder="URL"
                  value={url}
                  // onChange={(e) => setUrl(e.target.value)}
                  onChange={handleUrlChange}
                  className='mt-4 mb-2'
                  required
                />
                <p className='text-red-500'>{urlError && 'Please enter valid Url'}</p>
                <div className='mt-3'>
                  <Button type="submit" disabled={isSubmitting} onClick={editIndex !== null ? handleEditSubmit : handleSubmit}>
                    {isSubmitting ? (editIndex !== null ? 'Updating...' : 'Creating...') : (editIndex !== null ? 'Update' : 'Create')}
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button onClick={() => setShowSocialModal(true)}>+ Add Social Links</Button>
        <SocialLinksModal
          formData={formData}
          showModal={showSocialModal}
          handleClose={() => setShowSocialModal(false)}
          handleFormSubmit={handleSocialFormSubmit}
        />
      </div>
      <div className='w-full flex flex-col gap-3'>
        {formData?.links.length !== 0 ? <>
          {formData?.links?.map((link, index) => (
            <div key={index} className='border p-3 rounded-lg shadow-lg flex justify-between items-center'>
              <div className='flex flex-col'>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className='text-blue-500'>
                  {link.title}
                </a>
                <div>
                  <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">{link.clicks} clicks</span>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <Copy color="black" size={18} onClick={() => handleCopy(link.url)} role='button' />
                <Popover>
                  <PopoverTrigger>
                    <b className="text-xl">⋮</b>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul>
                      <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={() => { setEditIndex(index); setTitle(link.title); setUrl(link.url); setShowLinkModal(true); }}>Edit</li>
                      <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer" onClick={() => handleArchive(index)}>{link.archive ? 'Unarchive' : 'Archive'}</li>
                      <li className="hover:bg-gray-100 px-4 py-2 text-start text-sm cursor-pointer text-red-500" onClick={() => handleDelete(index)}>Delete Permanently</li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </> : <div className='mt-5'>
          <div className='text-xl font-bold text-center mb-2'>You do not have any links yet</div>
          <div className='text-gray-600 text-center'>Please click on the button above <br /> to add your first link 🚀</div>
        </div>}
      </div>
    </div>
  );
};

export default Profile;
