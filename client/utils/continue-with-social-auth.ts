import { toast } from "react-toastify";

export default async function continueWithSocialAuth(provider: string, redirect: string) {
    try {
        const url = `https://bookoegin-d820f894692b.herokuapp.com/api/o/${provider}/?redirect_uri=${
            process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://bookoe-jade.vercel.app'
        }/auth/${redirect}`;
               
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
            credentials: 'include' 
        });

        const data = await res.json()
        if (res.status === 200 && typeof window !== 'undefined') {
            window.location.replace(data.authorization_url)
        } else {
            toast.error('Something went wrong!')
        }

    } catch (err) {
        toast.error('Something went wrong!')
    }
}