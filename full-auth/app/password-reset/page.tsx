import { PasswordResetForm } from '@/components/forms'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Full Auth | Reset password',
  description: 'Full Auth reset-password page'
}

const Page = () => {
  
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100 dark:bg-[#11161b] font-Cairo">
      <div className="space-y-3 rounded-xl w-1/3 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#11142D] dark:text-white">Reset your password</h1>
        <>
          <PasswordResetForm />
        </>
      </div>
    </main>
  )
}

export default Page
