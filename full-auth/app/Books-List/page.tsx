import React from 'react';
import Filter from './Filter';
import Books from './Books';

const Page: React.FC = () => {

  return (
    <div className='pt-20 flex pb-36 gap-x-10 xl:px-44 lg:px-10 md:px-10 xs:px-5 dark:bg-[#232323] min-h-screen'>
      <div className='xs:hidden lg:flex font-Cairo lg:w-[35%] xl:w-[25%]'>
        <Filter />
      </div>
      <Books />
    </div>
  );
};

export default Page;
