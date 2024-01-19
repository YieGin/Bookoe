'use client'
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/common';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Link from 'next/link';

const Dashboard = () => {
  const { data: user, isLoading, isError } = useRetrieveUserQuery();


  if (isLoading) return <div className="text-center mt-10 flex items-center justify-center"><Spinner /></div>;

  if (isError || !user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10 h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="space-y-4">
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <Link 
          href="/password-reset"
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
