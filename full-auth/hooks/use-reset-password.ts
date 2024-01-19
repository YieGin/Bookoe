'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useResetPasswordMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify'

export default function useResetPassword() {
  const [resetPassword, {isLoading}] = useResetPasswordMutation()
  const [email, setEmail] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPassword(email)
    .unwrap()
    .then(() => {
      toast.success('Request sent, check your email for reset link')
    })
    .catch(() => {
      toast.error('Failed to register account')
    })
  }

  return {
    email,
    isLoading,
    onChange,
    onSubmit
  }
}