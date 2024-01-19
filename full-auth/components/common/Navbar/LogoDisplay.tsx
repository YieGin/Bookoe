// LogoDisplay.tsx
import React from 'react';
import Image from 'next/image';
import { Logo, LogoBlack } from '@/public';
import Link from 'next/link';

interface LogoDisplayProps {
  theme: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ theme }) => (
  <div className="text-3xl font-bold xl:mr-24 lg:mr-5">
    <Link href="/">
      {theme === "dark" ? (
        <Image src={LogoBlack} alt="Logo" width={150} height={150} />
      ) : (
        <Image src={Logo} alt="Logo" width={150} height={150} />
      )}
    </Link>
  </div>
);

export default LogoDisplay;
