"use client "
import React from 'react';

const DividerWithOr = () => {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-grow border-t border-black" />
      <span className="px-2 text-black">or</span>
      <hr className="flex-grow border-t border-black" />
    </div>
  );
};

export default DividerWithOr;
