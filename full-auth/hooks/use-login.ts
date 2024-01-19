'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from "next/navigation";
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify'
import { setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function useLogin() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ email, password })
    .unwrap()
    .then(() => {
      dispatch(setAuth())
      toast.success('Logged in')
      router.push('/dashboard')
    })
    .catch(() => {
      toast.error('Failed to log in')
    })
  }

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit
  }

}