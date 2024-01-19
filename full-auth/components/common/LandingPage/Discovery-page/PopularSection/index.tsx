import DotPattern from "./DotPattern";
import PopularContent from "./PopularContent";

const PopularSection = () => {
  return (
    <div className='font-Cairo flex lg:justify-start md:justify-center lg:flex-row gap-x-5 pt-10'>
      <div className='w-[100%] h-full mb-10 sm:px-10 xs:px-5 bg-[#e6f1fc] dark:bg-[#232323] rounded-3xl relative overflow-hidden'>
        <DotPattern />
        <div className='absolute top-0 right-28 bg-[#d7ebff] dark:bg-[#6C5DD3] rounded-full w-[250px] h-[250px] -translate-y-1/2 translate-x-2/2'/>
        <div className='absolute bottom-0 z-0 left-28 bg-[#d9ebfd] dark:h rounded-full w-[700px] h-[700px] translate-y-1/2 -translate-x-1/2'/>
        <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold xs:text-[17px] lg:text-[35px] mt-14 relative'>Popular in 2024</h1>
        <p className="sm:text-[14px] xs:text-[12px] xs:w-full relative font-sans leading-6 text-[#11142D] dark:text-[#D7D7D7] mt-4 lg:w-[80%] sm:w-[90%]">
          Discover what&apos;s trending in the literary world with Bookoe&apos;s Popular in 2024 collection.
          This selection brings you the year&apos;s most talked-about books, from thrilling new releases to must-read titles.
          Whether you&apos;re keeping up with book club favorites or exploring the latest buzz, find the stories that everyone is reading and talking about.
          Stay ahead of the curve and dive into the books defining 2024 with Bookoe.
        </p>
        <PopularContent />
      </div>
    </div>
  )
}

export default PopularSection;
