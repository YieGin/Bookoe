'use client'
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/common';
import { useRetrieveUserQuery, useUpdateUserMutation } from '@/redux/features/authApiSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { data: user, isLoading, isError, refetch } = useRetrieveUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');  // State for first name
  const [lastName, setLastName] = useState('');    // State for last name
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);  // Initialize first name state
      setLastName(user.last_name);    // Initialize last name state
    }

    // Check if there's a success message to be shown
    const success = localStorage.getItem('profileUpdateSuccess');
    if (success) {
      setShowSuccess(true);
      localStorage.removeItem('profileUpdateSuccess'); // Clear the flag
      refetch();  // Refetch user data after successful update
    }
  }, [user]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !user.id) {
      console.error('User data is not available');
      return;
    }
  
    try {
      await updateUser({ id: user.id, first_name: firstName, last_name: lastName }).unwrap();
      localStorage.setItem('profileUpdateSuccess', 'true');
      setShowSuccess(true);  // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isError || !user) return <p className="text-red-500">Error loading profile...</p>;

  return (
    <div className="p-6 bg-white pt-10 flex items-center justify-center flex-col dark:bg-[#11161b] h-screen">
      <div className='w-1/3 p-6 shadow-lg'>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Dashboard</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium">First Name:</label>
            <input type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="form-input mt-1 block w-full px-3 py-2 border-b border-[#6C5DD3] rounded-md focus:outline-none focus:ring-[#6C5DD3] focus:border-b-2 focus:border-[#6C5DD3]" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Last Name:</label>
            <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="form-input mt-1 block w-full px-3 py-2 border-b border-[#6C5DD3] rounded-md focus:outline-none focus:ring-[#6C5DD3] focus:border-b-2 focus:border-[#6C5DD3]" />
          </div>
          <button type="submit" className="w-full bg-[#6C5DD3] hover:bg-[#2d2469] transition-all delay-75 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? <Spinner lg /> : "Update Profile"}
          </button>
          <Link 
            href="/password-reset"
            className="inline-block mt-4 bg-[#6C5DD3] hover:bg-[#2d2469] text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </Link>
        </form>
        {showSuccess && <p className="text-green-500 text-center mt-4">Profile updated successfully!</p>}
      </div>
    </div>
  );
};

export default Profile;
