const DotPattern = () => {
    return (
      <div className='absolute top-0 left-0 pt-5 pl-5 space-y-1'>
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className='flex space-x-1'>
            {Array.from({ length: 3 }, (_, dot) => (
              <span key={dot} className='block w-[6px] h-[6px] bg-[#D3CCFF] rounded-full'></span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  export default DotPattern