import Link from 'next/link'
import React from 'react'
import { FaTimesCircle } from 'react-icons/fa' // Changed icon to indicate cancellation

const PaymentCancelled = () => {
  return (
    <div>
      <div className='h-screen flex flex-col items-center justify-center xs:px-5 dark:bg-[#11161b]'>
        <FaTimesCircle className='text-[#FF6347] text-[40px] mb-5' /> {/* Red color icon for cancellation */}
        <h1 className='text-[30px] font-bold font-Rubik text-[#11142D] dark:text-[#FFF]'>Your Payment Has Been Cancelled</h1>
        <p 
        className='md:text-[20px] xs:text-[15px] font-sans dark:text-[#ABABAB] text-[#ABABAB] text-center'>
        It looks like your payment was not completed. You can return to the 
        <Link className='text-[#6C5DD3] ml-1 dark:text-[#7381fc] underline-offset-2 underline' href={'/cart'}>checkout page</Link> to try again or explore more in our 
        <Link className='text-[#6C5DD3] ml-1 dark:text-[#7381fc] underline-offset-2 underline' href={'/books-list'}>books-list</Link>.
        </p>
      </div>
    </div>
  )
}

export default PaymentCancelled
