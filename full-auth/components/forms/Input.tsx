import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
    type: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    required?: boolean;
    link?: {
        linkText: string;
        linkUrl: string;
    },
    placeholder: string;
}

export default function Input({ type, name, onChange, placeholder, link, value, required = false }: Props) {
    return (
    <>
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#6C5DD3]"
        />
        {link && (
            <div>
                <Link className="font-semibold text-[#7381fc]" href={link.linkUrl}>
                    {link.linkText}
                </Link>
            </div>
        )}
    </>
    )
}