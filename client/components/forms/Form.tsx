import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/forms";
import { Spinner } from "../common";

interface Config {
    type: string;
    value: string;
    name: string;
    link?: {
        linkText: string;
        linkUrl: string;
    },
    required?: boolean;
    placeholder: string;
}

interface Props {
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ config, isLoading, btnText, onChange, onSubmit }: Props) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            {config.map((input, index) => (
                <Input 
                    key={input.name}
                    type={input.type} 
                    onChange={onChange} 
                    value={input.value}
                    link={input.link}
                    required={input.required} 
                    placeholder={input.placeholder}
                    name={input.name}
                />
            ))}
            <div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white rounded-md bg-[#6C5DD3] hover:bg-[#2d2469]"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner lg /> : btnText}
                </button>
            </div>
        </form>
    );
}
