import Link from 'next/link';
import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';

const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com', bgColor: 'bg-[#3b5998]', hoverColor: 'hover:bg-[#2e4a86]' },
    { name: 'Twitter', icon: BsTwitterX, url: 'https://twitter.com/x', bgColor: 'bg-[#1DA1F2]', hoverColor: 'hover:bg-[#1991db]' },
    { name: 'Whatsapp', icon: IoLogoWhatsapp, url: 'https://www.whatsapp.com/', bgColor: 'bg-[#25D366]', hoverColor: 'hover:bg-[#22b75a]' },
    { name: 'Email', icon: MdOutlineMailOutline, url: 'https://www.Email.com/', bgColor: 'bg-[#D44638]', hoverColor: 'hover:bg-[#c13b2e]' },
  ];
  
  const Social = () => {
    return (
      <div className='flex xl:gap-x-5 xs:gap-2 '>
        {socialLinks.map((link) => (
          <Link key={link.name} href={link.url}>
            <div className={`${link.bgColor} ${link.hoverColor} rounded-[14px] md:px-4 md:py-2 xs:px-2 xs:py-1 flex items-center text-white gap-x-1`}>
              <link.icon className='md:text-[20px] xs:text-[11px] xs:hidden md:flex' />
              <p className='font-sans font-semibold md:text-[14px] xs:text-[14px]'>{link.name}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  
  export default Social;
  
