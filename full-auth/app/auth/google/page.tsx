'use client'
import { Spinner } from '@/components/common'
import { useSocialAuth } from '@/hooks'
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice'
import React from 'react'

const Page = () => {
  const [googleAuthenticate] = useSocialAuthenticateMutation()
  useSocialAuth(googleAuthenticate, 'google-oauth2')


  return (
    <div>
      <Spinner lg />
    </div>
  )
}

export default Page
