import { SocialButtons } from '@/components/common'
import { RegisterForm } from '@/components/forms'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Full Auth | Register',
  description: 'Full Auth register page'
}

const Page = () => {
  
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <>
          <RegisterForm />
          <div className="text-center text-sm text-gray-500">
            or Sign up with
          </div>
          <SocialButtons />
        </>
        <div className="text-sm text-center text-gray-500">
          Have an account? <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </main>
  )
}

export default Page
