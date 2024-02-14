'use client'
import { useRegister } from "@/hooks";
import { Form } from ".";

export default function RegisterForm() {
  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit
  } = useRegister();
  
  const config = [
    {
      type: 'text',
      placeholder: 'First name',
      value: first_name,
      name: 'first_name',
      required: true
    },
    {
      type: 'text',
      placeholder: 'Last name',
      value: last_name,
      name: 'last_name',
      required: true
    },
    {
      type: 'email',
      placeholder: 'Email',
      value: email,
      name: 'email',
      required: true
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      name: 'password',
      required: true
    },
    {
      type: 'password',
      placeholder: 'Confirm Password',
      value: re_password,
      name: 're_password',
      required: true
    },
  ]
  return (
    <Form config={config} isLoading={isLoading} btnText="Sign up" onChange={onChange} onSubmit={onSubmit} />
  )
}