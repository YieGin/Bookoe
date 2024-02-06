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
    <main className="flex justify-center items-center h-screen dark:bg-[#11161b]">
      <div className="space-y-3 rounded-xl lg-md:w-1/3 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center dark:text-white">Sign up</h1>
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
