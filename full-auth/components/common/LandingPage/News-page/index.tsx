import { NewImage1, NewImage2, NewImage3, NewImage4 } from '@/public/images';
import Image from 'next/image';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const News = () => {

  const newsData = [
    {
      image: NewImage1,
      title: 'Why reading is important for our children?',
      description: "Discover the pivotal role of reading in enhancing children's cognitive development, imagination, and academic success.",
      author: 'Lidya Humble',
      date: '4 days ago'
    },
    {
      image: NewImage2,
      title: 'Benefits of reading: Smart, Diligent, Happy',
      description: 'Explore how regular reading cultivates intelligence, discipline, and joy, contributing to overall well-being and mental health.',
      author: 'Steffanny William',
      date: '3 days ago'
    },
    {
      image: NewImage3,
      title: 'What books you should read in 2024?',
      description: 'A curated list of must-reads for 2024, featuring groundbreaking works that promise to enlighten, entertain, and inspire.',
      author: 'James Wong',
      date: '2 days ago'
    },
    {
      image: NewImage4,
      title: '10 Things you must know to improve your reading',
      description: 'Master the art of reading with these ten essential tips, designed to boost comprehension, retention, and enjoyment.',
      author: 'Franklin Junior',
      date: '1 August 2023'
    },
  ];


  return (
    <div className='md:mt-36 xs:mt-20 xl:px-44 lg:px-24 md:px-10 xs:px-5'>
      <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold md:text-[50px] xs:text-[20px]'>Letest News</h1>
      <div className='flex justify-between xs:flex-wrap md:flex-nowrap'>
        <p className='text-[#aaa] md:text-[16px] xs:text-[13px] font-sans xs:w-[100%] md:w-[80%] lg-md:w-[30%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <div className='flex cursor-pointer gap-x-4 rounded-[14px] md:px-4 md:py-2 xs:px-4 xs:py-2 bg-[#6C5DD3] hover:bg-[#5d4cce] text-white items-center justify-between xs:mt-3 md:mt-0'>
            <p className='font-semibold lg-md:text-[18px] md:text-[14px] xs:text-[12px] font-Cairo'>View more</p>
            <FaArrowRightLong className='md:text-[20px]' />
        </div>
      </div>
      <div className='flex gap-x-5 md:flex-nowrap xs:flex-wrap'>
        {newsData.map((news, index) => (
          <div key={index} className='flex flex-col md:mt-20 xs:mt-10 gap-x-5'>
            <Image className='xl:h-[400px] cursor-pointer rounded-[14px] md:h-[150px] hover:scale-105 transition-all duration-300 ease-in-out' width={500} height={300} src={news.image} alt={`NewsImage${index + 1}`} />
            <h2 className='lg-md:mt-10 xs:mt-5 lg-md:mb-5 md:mb-2 xs:mb-2 text-[#11142D] dark:text-[#F0F0F0] font-semibold lg-md:text-[16px] md:text-[12px] xs:text-[18px] font-Cairo'>{news.title}</h2>
            <p className='text-[#aaa] dark:text-[#c7c7c7] lg-md:text-[14px] md:text-[12px] font-sans line-clamp-2'>{news.description}</p>
            <p className='text-[#6C5DD3] dark:text-[#8a7bf0] lg-md:text-[14px] md:text-[12px] font-sans cursor-pointer mt-1'>Continue reading</p>
            <div className='flex gap-x-3 items-center mt-5'>
              <div className='rounded-full w-[50px] h-[50px] bg-[#C4C4C4]' />
              <div>
                <h2 className='text-[#11142D] dark:text-[#F0F0F0] font-semibold lg-md:text-[14px] md:text-[12px] font-Cairo'>{news.author}</h2>
                <p className='text-[#c7c7c7] lg-md:text-[14px] md:text-[12px] font-sans'>{news.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News
