import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function useSocialAuth(authenticate: any, provider: string) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const effectRan = useRef(false)
    useEffect(() => {
        const state = searchParams.get('state')
        const code = searchParams.get('code')
        if (state && code && !effectRan.current) {
            authenticate({ state, code, provider })
                .unwrap()
                .then(() => {
                    dispatch(setAuth())
                    toast.success('Logged in')
                    router.push('/dashboard')
                })
                .catch(() => {
                    toast.error('Failed to log in')
                    router.push('/auth/login')
                })
        }
        return () => {
            effectRan.current = true
        }
    }, [authenticate, provider])
}