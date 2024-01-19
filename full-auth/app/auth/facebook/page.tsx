'use client'
import { Spinner } from '@/components/common'
import { useSocialAuth } from '@/hooks'
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice'
import React from 'react'

const Page = () => {
  const [facebookAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(facebookAuthenticate, 'facebook')


  return (
    <div>
      <Spinner lg />
    </div>
  )
}

export default Page
