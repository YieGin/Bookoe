import DotPattern from "./DotPattern";
import RecommendationsContent from "./RecommendationsContent";

const RecommendationsSection = () => {
  return (
    <div className='font-Cairo flex lg:justify-start md:justify-center lg:flex-row gap-x-5 pt-10'>
      <div className='w-full h-full md:mb-10 xs:pb-10 xl:pb-0 sm:px-10 xs:px-5 bg-[#fff6ef] dark:bg-[#11161b] rounded-3xl relative overflow-hidden'>
        <DotPattern />
        <div className='absolute top-0 right-2 bg-[#ffe7d4] dark:bg-[#FFE7D4] rounded-full w-[300px] h-[300px] -translate-y-1/2 translate-x-1/2'/>
        <div className='absolute bottom-0 z-0 left-2 bg-[#ffe7d4] dark:bg-[#FFE7D4] rounded-full w-[300px] h-[300px] translate-y-1/2 -translate-x-1/2'/>
        <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold xs:text-[17px] lg:text-[35px] mt-14 relative'>Recomended For You</h1>
        <p className="sm:text-[14px] xs:text-[12px] relative font-sans leading-6 text-[#11142D] dark:text-[#D7D7D7] mt-4 lg:w-[80%] sm:w-[90%] xs:w-[100%]">
          Discover books you&apos;ll love with Bookoe&apos;s personalized recommendations. Our Recommended For You section is tailored
          to match your reading tastes, offering a selection of stories that resonate with your interests. From thrilling
          adventures to captivating narratives, find your next favorite read, handpicked just for you. Explore, enjoy, and dive into
          a world of books curated for your unique journey with Bookoe.
        </p>
        <RecommendationsContent />
      </div>
    </div>
  )
}

export default RecommendationsSection;
