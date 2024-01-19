import { FaStar } from "react-icons/fa";

interface TestimonialProps {
  text: string;
  name: string;
  role: string;
  stars: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ text, name, role, stars }) => {
  return (
    <div className='bg-white shadow-lg shadow-[#dedbf5] dark:shadow-[#000000] md:w-[35%] rounded-[14px] lg-md:p-5 xs:p-3 md:mt-20'>
      <div className='flex justify-center'>
        <h2 className='text-black font-semibold xs:text-[12px] lg:text-[17px] md:text-[12px] font-sans text-center mb-5 lg:w-[90%] md:line-clamp-3 lg:line-clamp-none'>{text}</h2>
      </div>
      <div className='flex lg-md:gap-x-3 md:gap-x-1 items-center'>
        <div>
          <div className='rounded-full bg-[#C4C4C4] lg:w-[55px] lg:h-[55px] md:w-[35px] md:h-[35px]' />
        </div>
        <div className='flex flex-col gap-y-2'>
          <p className='font-bold text-[#3D3D3D] xs:text-[14px] lg:text-[18px] md:text-[12px] font-sans'>{name}</p>
          <p className='text-[#3D3D3D] text-[14px] font-sans'>{role}</p>
        </div>
        <div className='ml-auto flex'>
          {[...Array(stars)].map((_, index) => (
            <FaStar key={index} className="lg-md:text-[24px] md:text-[14px] text-[#FF754C]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
