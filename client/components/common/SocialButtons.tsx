'use client'
import { continueWithFacebook, continueWithGoogle } from '@/utils';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 mt-5">
      <button
        onClick={continueWithGoogle}
        className="flex-1 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 font-medium transition-colors duration-300"
      >
        <FaGoogle className="mr-2" />
        Google
      </button>
      <button
        onClick={continueWithFacebook}
        className="flex-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 font-medium transition-colors duration-300"
      >
        <FaFacebookF className="mr-2" />
        Facebook
      </button>
    </div>
  );
}
