const DotPattern = () => {
    return (
      <div className='absolute top-24 z-10 right-16 pt-5 pl-5 space-y-1 md:block xs:hidden'>
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className='flex space-x-1'>
            {Array.from({ length: 3 }, (_, dot) => (
              <span key={dot} className='block w-[4px] h-[4px] bg-[#ffb075] rounded-full'></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  export default DotPattern