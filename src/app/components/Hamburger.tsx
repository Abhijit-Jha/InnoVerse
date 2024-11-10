import React from 'react';

const Hamburger = ({isOpen}:{isOpen : boolean}) => {
  
  return (
    <div >
      {isOpen ? (
        
        <div className='space-y-1 transition-all duration-300 ease-in-out'>
          <div className='w-8 h-1 bg-black rounded-full transform rotate-45 translate-y-2'></div>
          <div className='w-8 h-1 bg-black rounded-full opacity-0'></div>
          <div className='w-8 h-1 bg-black rounded-full transform -rotate-45 -translate-y-2'></div>
        </div>
      ) : (
        
        <div className='space-y-1 transition-all duration-300 ease-in-out'>
          <div className='w-8 h-1 bg-black rounded-full'></div>
          <div className='w-8 h-1 bg-black rounded-full'></div>
          <div className='w-8 h-1 bg-black rounded-full'></div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
