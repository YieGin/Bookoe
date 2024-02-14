import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-gray-800 dark:bg-[#11161b]">
      <h1 className="dark:text-white text-[22vw] mix-blend-difference slashed-zero font-bold font-neuemontrealcondensed leading-none">404</h1>
      <p className="dark:text-gray-200 font-neuemontreal text-4xl max-w-[30ch] text-center">
        Oops! The page you&apos;re looking for isn&apos;t here.
      </p>
      <Link href="/">
        <p className="flex items-center justify-center px-6 py-3 dark:text-white font-bold rounded-full transition duration-300">
          <FaHome className="mr-2" /> Go Home
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
