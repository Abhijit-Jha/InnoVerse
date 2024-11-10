"use client"
import React, { useEffect } from 'react';
import UploadProject from '../components/UploadProject';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/auth/signin");
    }
  }, [status, router]);



  return (
    <div className='mt-24 w-full' suppressHydrationWarning={true}>
      <UploadProject />
    </div>
  );
};

export default Page;
