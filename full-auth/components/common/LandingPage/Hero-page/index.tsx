'use client'
import React from 'react';
import { motion } from 'framer-motion';
import DotPattern from "./DotPattern";
import HeroContent from "./HeroContent";
import Sidebar from "./Sidebar";

const Hero = () => {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className='font-Cairo flex lg:justify-start md:justify-center lg:flex-row gap-x-5 pt-10 xl:px-44 lg:px-24 md:px-10 xs:px-5'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='md:w-[100%] md:h-[660px] lg:p-0 md:pb-24 xs:pb-9 bg-[#F2F0FE] dark:bg-[#11161b] rounded-3xl lg:pl-20 xs:px-2 sm:px-5 relative overflow-hidden'>
        <DotPattern />
        <div className='absolute lg:top-20 lg:right-20 md:top-5 md:right-5 bg-[#FF9F59] dark:bg-[#6C5DD3] rounded-full lg:w-[500px] lg:h-[500px] md:w-[150px] md:h-[150px] -translate-y-1/2 translate-x-1/2'/>
        <HeroContent />
        <div className='absolute bottom-[-20px] left-1/2 bg-[#D7D2F2] rounded-full lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] translate-y-1/2 -translate-x-1/2' />
      </div>
      <Sidebar />
    </motion.div>
  )
}

export default Hero;
