import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl md:text-3xl font-light mb-8">
        Oops! The page you&apos;re looking for isn&apos;t here.
      </p>
      <Link href="/">
        <p className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300">
          <FaHome className="mr-2" /> Go Home
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
