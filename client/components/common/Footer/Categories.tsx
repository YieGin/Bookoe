import Link from 'next/link';
import React from 'react';
import "../../../styles/style.scss";

interface CategoryLink {
  name: string;
  href: string;
}

const Categories: React.FC = () => {
  const bookCategories: CategoryLink[] = [
    { name: 'Adventure', href: '/books-list?category=Adventure' },
    { name: 'Animation', href: '/books-list?category=Animation' },
    { name: 'Biography', href: '/books-list?category=Biography' },
    { name: 'Comedy', href: '/books-list?category=Comedy' },
    { name: 'Crime', href: '/books-list?category=Crime' },
    { name: 'Documentary', href: '/books-list?category=Documentary' },
    { name: 'History', href: '/books-list?category=History' },
    { name: 'Horror', href: '/books-list?category=Horror' },
    { name: 'Mystery', href: '/books-list?category=Mystery' },
    { name: 'Romance', href: '/books-list?category=Romance' }, // already set
    { name: 'Sci-fi', href: '/books-list?category=Sci-fi' },
    { name: 'Sport', href: '/books-list?category=Sport' },
  ];

  const quickLinks: CategoryLink[] = [
    { name: 'About us', href: '/' },
    { name: 'Contact us', href: '/' },
    { name: 'Products', href: '/books-list' },
    { name: 'Login', href: '/auth/login' },
    { name: 'Sign Up', href: '/auth/register' },
    { name: 'FAQ', href: '/' },
    { name: 'Shipment', href: '/' },
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
    <div className='xl:w-[30%] lg:w-[40%] xs:w-full flex lg:ml-20 xs:mt-5 lg:mt-0 xs:justify-between md:justify-normal'>
      <div className='flex flex-col font-Cairo'>
        <h1 className='text-[#11142D] dark:text-[#fff] font-bold sm:text-[20px] xs:text-[15px] mb-5'>Books Categories</h1>
        <div className='flex xl:gap-x-20 xs:gap-x-5 sm:gap-x-16 md:gap-x-10 lg:gap-x-5'>
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
