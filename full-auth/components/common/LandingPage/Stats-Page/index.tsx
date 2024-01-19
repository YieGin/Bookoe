import { Collections, Customers, Stores, Writers } from '@/public'
import Image from 'next/image'
import React from 'react'

const StatsPage = () => {

    const stats = [
        { title: 'Happy Customers', number: '125,663', image: Customers, alt: 'Customers' },
        { title: 'Book Collections', number: '50,672+', image: Collections, alt: 'Collections' },
        { title: 'Our Stores', number: '1,562', image: Stores, alt: 'Stores' },
        { title: 'Famous Writers', number: '457', image: Writers, alt: 'Writers' },
    ];
    
    return (
        <div className='md:mt-36 xs:mt-10 flex justify-between xl:px-44 lg:px-24 md:px-10 xs:px-2'>
            {stats.map((stat, index) => (
                <div key={index} className='flex flex-col items-center'>
                    <Image width={100} height={100} className='md:w-[100px] md:h-[100px] xs:w-[30px] xs:h-[30px]' alt={stat.alt} src={stat.image} />
                    <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold font-Cairo lg:text-[48px] md:text-[30px]'>{stat.number}</h1>
                    <p className='text-[#c7c7c7] font-semibold font-Cairo md:text-[17px] xs:text-[10px]'>{stat.title}</p>
                </div>
            ))}
        </div>
    );
    
}

export default StatsPage
