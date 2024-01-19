import { Secure } from '@/public'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { AiFillLike } from "react-icons/ai";
import { FaBoltLightning } from 'react-icons/fa6';

const Delivery = () => {
  const deliveryItems = [
    {
      icon: <FaBoltLightning color='#6C5DD3' size={20} />,
      title: "Quick Delivery",
      description: "Experience lightning-fast delivery with Bookoe! Get your favorite reads delivered right to your doorstep in no time.",
    },
    {
      icon: <Image width={20} height={20} alt='Secure Payment' src={Secure} />,
      title: "Secure Payment",
      description: "Shop with confidence on Bookoe! Our secure payment system ensures your transactions are safe and hassle-free.",
    },
    {
      icon: <AiFillLike color='#6C5DD3' size={20} />,
      title: "Best Quality",
      description: "Quality is our priority at Bookoe. Enjoy a curated selection of books in the finest condition for an unmatched reading experience.",
    },
    {
      icon: <FaStar color='#6C5DD3' size={20} />,
      title: "Return Guarantee",
      description: "Satisfaction guaranteed at Bookoe. If you're not happy with your purchase, our easy return policy has got you covered.",
    },
  ];

  return (
    <div className='flex gap-x-2 gap-y-5 mt-20 w-full xs:flex-wrap lg:flex-nowrap xl:px-44 lg:px-24 md:px-10 xs:px-5'>
      {deliveryItems.map((item, index) => (
        <div className='flex gap-x-3' key={index}>
            <div>
                <div className='bg-[#F0EEFF] rounded-xl flex items-center justify-center w-10 h-10'>
                    {item.icon}
                </div>
            </div>
            <div>
                <h1 className='text-[#000000] dark:text-white font-bold font-Cairo lg:text-[15px] xl:text-[20px] mb-1'>{item.title}</h1>
                <p className='text-[#888888] font-sans xs:text-[12px] md:text-[15px] lg:text-[12px] xl:text-[14px] lg:w-[100%] xl:w-[90%]'>{item.description}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Delivery;
