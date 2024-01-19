'use client'
import { useResetPassword } from "@/hooks";
import { Form } from ".";

export default function PasswordResetForm() {
  const {
    email,
    isLoading,
    onChange,
    onSubmit
  } = useResetPassword();

  const config = [
    {
      type: 'email',
      placeholder: 'Email',
      value: email,
      name: 'email',
      required: true
    },
  ]

  return (
    <Form config={config} isLoading={isLoading} btnText="Reset password" onChange={onChange} onSubmit={onSubmit} />
  )
}