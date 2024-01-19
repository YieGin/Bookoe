'use client'

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { Spinner } from "../common";
import { toast } from 'react-toastify';
import React, { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center my-8">
                <Spinner lg />
            </div>
        );
    }

    if (!isAuthenticated) return null; // Optionally, you can render something else here

    return <>{children}</>;
}
