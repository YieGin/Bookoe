const DotPattern = () => {
    return (
      <div className='absolute top-24 z-10 right-16 pt-5 pl-5 space-y-1 md:block xs:hidden'>
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className='flex space-x-1'>
            {Array.from({ length: 6 }, (_, dot) => (
              <span key={dot} className='block w-[4px] h-[4px] bg-[#88c6ff] dark:bg-[#6C5DD3] rounded-full'></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  export default DotPattern