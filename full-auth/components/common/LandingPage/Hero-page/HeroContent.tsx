import { FaArrowRightLong } from "react-icons/fa6";

const HeroContent = () => {
    return (
      <div className="">
        <h2 className='uppercase text-[#6C5DD3] dark:text-[#F0F0F0] font-bold text-[15px] pt-20 pb-2 lg:py-20 tracking-[3px]'>Back to school</h2>
        <div className='pl-1'>
          <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold lg:text-[45px] xs:text-[20px] sm:[40px] mt-4'>Special 50% Off</h1>
          <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-semibold lg:text-[30px] xs:text-[17px] mt-4'>for our student community</h1>
          <p className='sm:text-[14px] xs:text-[12px] font-sans leading-6 text-[#11142D] dark:text-[#D7D7D7] mt-4 lg:w-[50%] sm:w-[90%] xs:w-[100%]'>
            Dive into the world of literature with Bookoe! From classic novels to modern bestsellers, our extensive collection caters to all kinds of readers.
            Embrace the joy of reading and discover your next great adventure, story, or idea.
            Whether you&apos;re a student, a lifelong learner, or just looking for your next favorite book,
            Bookoe is your gateway to a universe of knowledge and imagination.
          </p>
          <div className='mt-10 flex gap-x-5'>
            <div className='flex rounded-[14px] z-10 w-[198px] md:h-[60px] xs:h-[50px] bg-[#6C5DD3] hover:bg-[#6252cc] items-center justify-center cursor-pointer lg:gap-x-8 sm:gap-x-3 xs:gap-x-1'>
              <p className='text-white font-semibold md:text-[18px] xs:text-[12px]'>Get the deal</p>
              <FaArrowRightLong className="text-white" />
            </div>
            <div className='flex rounded-[14px] w-[198px] md:h-[60px] xs:h-[50px] z-10 border-[#AAAAAA] hover:bg-[#dddaf8] border-[1px] items-center justify-center cursor-pointer gap-x-8'>
              <p className='text-[#11142D] font-semibold md:text-[18px] xs:text-[12px] dark:text-[#F0F0F0]'>See other promos</p>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default HeroContent
  