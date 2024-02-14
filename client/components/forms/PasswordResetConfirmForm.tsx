'use client'
import { useResetPasswordConfirm } from "@/hooks";
import { Form } from ".";

interface Props {
    uid: string;
    token: string;
}

export default function PasswordResetConfirmForm( { uid, token }: Props ) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } = useResetPasswordConfirm(uid, token)

  const config = [
    {
      type: 'password',
      placeholder: 'New password',
      value: new_password,
      name: 'new_password',
      required: true
    },
    {
      type: 'password',
      placeholder: 'Confirm password',
      value: re_new_password,
      name: 're_new_password',
      required: true
    },
  ]

  return (
    <Form config={config} isLoading={isLoading} btnText="Reset password" onChange={onChange} onSubmit={onSubmit} />
  )
}