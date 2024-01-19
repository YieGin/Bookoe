const DotPattern = () => {
    return (
      <div className='absolute top-10 z-10 left-10 pt-0 pl-0 space-y-2 md:block xs:hidden'>
        {Array.from({ length: 4 }, (_, row) => (
          <div key={row} className='flex space-x-1'>
            {Array.from({ length: 2 }, (_, dot) => (
              <span key={dot} className='block w-[6px] h-[6px] bg-[#c7beff] rounded-full'></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  export default DotPattern