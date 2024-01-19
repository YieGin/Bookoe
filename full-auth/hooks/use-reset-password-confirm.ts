'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useResetPasswordConfirmMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

export default function useResetPasswordConfirm( uid: string, token: string ) {
  const router = useRouter()

  const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation()
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  })

  const {new_password, re_new_password} = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPasswordConfirm({ uid, token, new_password, re_new_password })
    .unwrap()
    .then(() => {
      toast.success('Password reset successful!')
      router.push('/auth/login')
    })
    .catch(() => {
      toast.error('Password reset failed')
    })
  }

  return {
    new_password,
    re_new_password,
    isLoading,
    onChange,
    onSubmit
  }
}