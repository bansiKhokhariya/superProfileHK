'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the profile page
    router.push('/profile');
  }, [router]);

  return null;
}
