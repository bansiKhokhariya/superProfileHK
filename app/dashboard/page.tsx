// import ButtonAccount from "@/components/ButtonAccount";
// import { useEffect } from "react";


'use client'
export const dynamic = "force-dynamic";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {

   const router = useRouter();

  useEffect(() => {
    // Redirect to the profile page
    router.push('/app/payment-page');
  }, [router]);

  return (
    <h1>bansi</h1>
  );
}


