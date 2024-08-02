

'use client'
export const dynamic = "force-dynamic";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default async function Page() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the profile page
    router.push('/api/auth/signin?callbackUrl=%2Fdashboard');
  }, [router]);

  return (
    <h1></h1>
  );
}


