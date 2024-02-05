import { SocialButtons } from '@/components/common'
import { LoginForm } from '@/components/forms'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Full Auth | Login',
  description: 'Full Auth login page'
}

const Page = () => {
  
  return (
    <main className="flex justify-center items-center h-screen dark:bg-[#11161b]">
      <div className="space-y-3 rounded-xl w-1/3 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center dark:text-white">Sign in to your account</h1>
        <>
          <LoginForm />
          <div className="text-center text-sm text-gray-500">
            or Sign up with
          </div>
          <SocialButtons />
        </>
        <div className="text-sm text-center text-gray-500">
          Don&apos;t have an account? <Link href="/auth/register" className="text-[#7381fc] hover:underline">Register here</Link>
        </div>
      </div>
    </main>
  )
}

export default Page
