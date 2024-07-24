'use client';

import { useState } from 'react';
import LoginForm from './LoginForm'; // Ensure the path is correct

const SignInButton = ({redirectUrl}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="btn">
        Sign In
      </button>

      {isModalOpen && <LoginForm onClose={closeModal} redirectUrl={redirectUrl}/>}
    </>
  );
};

export default SignInButton;
