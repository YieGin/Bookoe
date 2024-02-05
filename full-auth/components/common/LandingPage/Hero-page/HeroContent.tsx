import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroContent = () => {
    return (
      <div className="relative">
        <h2 className='uppercase text-[#6C5DD3] dark:text-[#F0F0F0] font-bold text-[15px] pt-20 pb-2 lg:py-20 tracking-[3px]'>Back to school</h2>
        <div className='pl-1'>
          <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold lg:text-[30px] xs:text-[17px] sm:[25px] mt-4'>Embark on a Literary Adventure with Bookoe</h1>
          <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-semibold lg:text-[25px] xs:text-[17px] mt-4 relative'>Explore. Discover. Inspire.</h1>
          <p className='sm:text-[14px] xs:text-[12px] font-sans leading-6 text-[#11142D] dark:text-[#D7D7D7] mt-4 lg:w-[50%] sm:w-[90%] xs:w-[100%]'>
            Step into Bookoe&apos;s realm of endless possibilities, where every book opens a door to new worlds. From timeless classics to
            contemporary masterpieces, our collection is a treasure trove for readers of all ages and interests. Whether you&apos;re a curious student,
            a passionate reader, or someone seeking inspiration, find your perfect companion in our vast array of books. Join the Bookoe community and let
            the journey of discovery begin!
          </p>
          <div className='mt-10 flex gap-x-5'>
            <Link href={'/books-list'} className='flex rounded-[14px] z-10 w-[198px] md:h-[60px] xs:h-[50px] bg-[#6C5DD3] hover:bg-[#6252cc] items-center justify-center cursor-pointer lg:gap-x-8 sm:gap-x-3 xs:gap-x-1'>
              <p className='text-white font-semibold md:text-[18px] xs:text-[12px]'>Get the deal</p>
              <FaArrowRightLong className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    );
  };


export default HeroContent
  