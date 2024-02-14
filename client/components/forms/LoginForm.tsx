'use client'
import { useLogin } from "@/hooks";
import { Form } from ".";

export default function LoginForm() {
  const {
    email,
    password,
    isLoading,
    onChange,
    onSubmit
  } = useLogin();
  
  const config = [

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
      link: {
        linkText: 'Forget password?',
        linkUrl: '/password-reset',
      },
      name: 'password',
      required: true
    },
  ]
  return (
    <Form config={config} isLoading={isLoading} btnText="Sign in" onChange={onChange} onSubmit={onSubmit} />
  )
}