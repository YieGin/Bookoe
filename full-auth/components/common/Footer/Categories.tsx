import Link from 'next/link';
import React from 'react';
import "../../../styles/style.scss";

interface CategoryLink {
  name: string;
  href: string; // Add appropriate URL for each category and link
}

const Categories: React.FC = () => {
  const bookCategories: CategoryLink[] = [
    { name: 'Adventure', href: '/adventure' },
    { name: 'Animation', href: '/animation' },
    { name: 'Biography', href: '/biography' },
    { name: 'Comedy', href: '/comedy' },
    { name: 'Crime', href: '/crime' },
    { name: 'Documentary', href: '/documentary' },
    { name: 'History', href: '/history' },
    { name: 'Horror', href: '/horror' },
    { name: 'Mystery', href: '/mystery' },
    { name: 'Romance', href: '/romance' },
    { name: 'Sci-fi', href: '/sci-fi' },
    { name: 'Sport', href: '/sport' },
  ];

  const quickLinks: CategoryLink[] = [
    { name: 'About us', href: '/about' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Products', href: '/products' },
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipment', href: '/shipment' },
  ];

  const renderLinks = (links: CategoryLink[]) => (
    <div className='flex flex-col gap-y-3 text-[#11142D] dark:text-[#c7c7c7] font-semibold sm:text-[16px] xs:text-[12px]'>
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <p className='text'>{link.name}</p>
        </Link>
      ))}
    </div>
  );

  return (
    <div className='xl:w-[30%] lg:w-[40%] xs:w-full flex lg:ml-20 xs:mt-5 lg:mt-0'>
      <div className='flex flex-col font-Cairo'>
        <h1 className='text-[#11142D] dark:text-[#fff] font-bold sm:text-[20px] xs:text-[15px] mb-5'>Books Categories</h1>
        <div className='flex xl:gap-x-20 xs:gap-x-5 md:gap-x-10 lg:gap-x-5'>
          {renderLinks(bookCategories.slice(0, 6))}
          {renderLinks(bookCategories.slice(6))}
        </div>
      </div>
      <div className='lg:ml-20 xs:ml-5'>
        <h1 className='text-[#11142D] dark:text-[#fff] font-bold sm:text-[20px] xs:text-[15px] mb-5'>Quick Links</h1>
        {renderLinks(quickLinks)}
      </div>
    </div>
  )
}

export default Categories;
