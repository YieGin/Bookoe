'use client'
import { useActivationMutation } from '@/redux/features/authApiSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  params: {
    uid: string;
    token: string;
  }
}


const Page = ({ params }: Props) => {
  const router = useRouter();
  const [activation] = useActivationMutation();
  // Define the type of activationStatus state
  const [activationStatus, setActivationStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const { uid, token } = params;
    activation({ uid, token })
      .unwrap()
      .then(() => setActivationStatus('success'))
      .catch(() => setActivationStatus('error'))
      .finally(() => {
        router.push('/auth/login');
      });
  }, []);

  useEffect(() => {
    if (activationStatus === 'success') {
      toast.success('Account activated');
    } else if (activationStatus === 'error') {
      toast.error('Failed to activate account');
    }
  }, [activationStatus]);

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Activating your account...</h1>
      </div>
    </div>
  )
}

export default Page
