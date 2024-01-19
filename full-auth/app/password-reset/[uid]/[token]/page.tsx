import { PasswordResetConfirmForm } from '@/components/forms'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Full Auth | Reset password confirm',
  description: 'Full Auth reset-password-confirm page'
}

interface Props {
  params: {
    uid: string;
    token: string;
  }
}


const Page = ({ params: {uid, token}}: Props) => {
  
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Reset your password</h1>
        <>
          <PasswordResetConfirmForm uid={uid} token={token} />
        </>
      </div>
    </main>
  )
}

export default Page
