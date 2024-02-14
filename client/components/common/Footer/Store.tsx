import { StoreImage } from '@/public/images'
import Image from 'next/image'
import React from 'react'
import { BsPhone } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { MdEmail } from 'react-icons/md'

const Store = () => {
  return (
    <div className='font-Cairo xs:w-full lg:w-[30%]'>
      <h1 className='text-[#11142D] dark:text-[#fff] font-bold text-[20px] mb-5'>Our Store</h1>
      <Image objectFit='cover' alt='Store Image' width={300} height={100} className='rounded-[14px] xl:w-full h-[120px] bg-[#C4C4C4]' src={StoreImage} />
        <div className='flex flex-col gap-y-5 mt-5'>
            <div className='flex gap-x-2 items-center'>
                <CiLocationOn className='text-[20px] text-[#6C5DD3] dark:text-[#7381fc]' />
                <p className='text-[#11142D] dark:text-[#fff] font-semibold sm:text-[18px] xs:text-[15px] font-Cairo w-[80%]'>832  Thompson Drive, San Fransisco CA 94107, United States</p>
            </div>
            <div className='flex gap-x-2 items-center'>
                <BsPhone className='text-[20px] text-[#6C5DD3] dark:text-[#7381fc]' />
                <p className='text-[#11142D] dark:text-[#fff] font-semibold sm:text-[18px] xs:text-[15px] font-Cairo'>+123 345123 556</p>
            </div>
            <div className='flex gap-x-2 items-center'>
                <MdEmail className='text-[20px] text-[#6C5DD3] dark:text-[#7381fc]' />
                <p className='text-[#11142D] dark:text-[#fff] font-semibold sm:text-[18px] xs:text-[15px] font-Cairo'>support@bookoe.com</p>
            </div>
        </div>
    </div>
  )
}

export default Store
