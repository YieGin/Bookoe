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
      <div className='flex gap-x-5'>
        {socialLinks.map((link) => (
          <Link key={link.name} href={link.url}>
            <div className={`${link.bgColor} ${link.hoverColor} rounded-[14px] px-4 py-2 flex text-white gap-x-1`}>
              <link.icon className='text-[20px]' />
              <p className='font-sans font-semibold text-[14px]'>{link.name}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  
  export default Social;
  
