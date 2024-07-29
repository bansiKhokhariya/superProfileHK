'use client';

import { useState, useContext } from 'react';
import { magic } from '@/libs/magic';
import { UserContext } from '../libs/UserContext';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

const SignInButton = ({ redirectUrl }) => {
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
    } catch (error) {
      setDisabled(false);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant='outline' className='text-white'>Sign In</Button>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              <Input type="text" placeholder="Enter your email" className='mt-4 mb-4' onChange={(e) => setEmail(e.target.value)} value={email} />
              <Button
                onClick={handleLoginWithEmail}
                disabled={disabled}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInButton;