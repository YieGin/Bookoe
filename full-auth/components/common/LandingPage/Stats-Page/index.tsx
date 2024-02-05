'use client'
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Image from 'next/image';
import { Collections, Customers, Stores, Writers } from '@/public';

interface Stat {
  title: string;
  number: string;
  image: any;
  alt: string;
}

const StatItem = ({ title, number, image, alt }: Stat) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className='flex flex-col items-center' ref={ref}>
      <Image width={100} height={100} className='md:w-[100px] md:h-[100px] xs:w-[30px] xs:h-[30px]' alt={alt} src={image} />
      <h1 className='text-[#11142D] dark:text-[#F0F0F0] font-bold font-Cairo lg:text-[48px] md:text-[30px]'>
        {inView ? <CountUp end={parseInt(number)} duration={3} /> : '0'}
      </h1>
      <p className='text-[#c7c7c7] font-semibold font-Cairo md:text-[17px] xs:text-[10px]'>{title}</p>
    </div>
  );
};

const StatsPage = () => {
    const stats: Stat[] = [
      { title: 'Happy Customers', number: '125663', image: Customers, alt: 'Customers' },
      { title: 'Book Collections', number: '50672', image: Collections, alt: 'Collections' },
      { title: 'Our Stores', number: '1562', image: Stores, alt: 'Stores' },
      { title: 'Famous Writers', number: '457', image: Writers, alt: 'Writers' },
    ];

  return (
    <div className='md:mt-36 xs:mt-10 flex justify-between xl:px-44 lg:px-24 md:px-10 xs:px-2'>
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsPage;
