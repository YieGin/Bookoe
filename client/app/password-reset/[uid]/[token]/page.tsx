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
    <main className="flex justify-center items-center h-screen dark:bg-[#11161b] md:px-10 xs:px-3">
      <div className="space-y-3 rounded-xl lg:w-1/3 p-6 shadow-lg">
        <h1 className="sm:text-2xl xs:text-[15px] font-bold text-center dark:text-white">Reset your password</h1>
        <>
          <PasswordResetConfirmForm uid={uid} token={token} />
        </>
      </div>
    </main>
  )
}

export default Page
