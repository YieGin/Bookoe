import { MenuSvg } from '@/public'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io';
import { DarkLogo, StoreImage, WhiteLogo } from '@/public/images';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CategoryLink {
  name: string;
  href: string;
}


const Menu: React.FC = () => {
  const theme = useSelector((state: RootState) => state.themeMenu.theme);
  const [isOpen, setIsOpen] = useState(false);

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
    { name: 'Romance', href: '/books-list?category=Romance' },
    { name: 'Sci-fi', href: '/books-list?category=Sci-fi' },
    { name: 'Sport', href: '/books-list?category=Sport' },
  ];

  const firstHalf = bookCategories.slice(0, 6);
  const secondHalf = bookCategories.slice(6);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className='flex gap-x-3 cursor-pointer relative'>
      <Image alt='Menu' src={MenuSvg} className='w-5' />
      <p className='text-[#6C5DD3] dark:text-white font-bold text-[18px] select-none'>Menus</p>
      <IoIosArrowDown size={16} className="text-[#6C5DD3] dark:text-white mt-2" />
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute left-[-20px] mt-10 py-2 bg-white dark:bg-[#11161b] rounded-md shadow-xl z-50"
          style={{ width: 'max-content' }}
        >
          <>
            <div className="flex">
            {theme === "dark" ? (
              <Image className='object-cover' loading="lazy" src={DarkLogo} alt="Logo" width={200} height={50} />
            ) : (
              <Image loading="lazy" src={WhiteLogo} alt="Logo" width={200} height={50} />
            )}
              <div className="flex flex-col">
                {firstHalf.map((category, index) => (
                  <Link
                    key={index} 
                    href={category.href}
                    className="px-10 py-3 text-sm text-gray-700 font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col">
                {secondHalf.map((category, index) => (
                  <Link 
                    key={index} 
                    href={category.href}
                    className="px-10 py-3 text-sm text-gray-700 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        </motion.div>
      )}
    </div>
  )
}

export default Menu;
