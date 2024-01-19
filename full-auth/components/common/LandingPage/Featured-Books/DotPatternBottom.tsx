const DotPatternBottom = () => {
    return (
      <div className='absolute bottom-10 z-10 right-10 pt-0 pl-0 space-y-2 md:block xs:hidden'>
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className='flex space-x-3'>
            {Array.from({ length: 4 }, (_, dot) => (
              <span key={dot} className='block w-[6px] h-[6px] bg-[#c7beff] rounded-full'></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  export default DotPatternBottom