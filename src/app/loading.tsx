import React from 'react';

const LoaderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-700">
      <div className="loader h-32 w-32 border-b-4 border-red-500 border-t-4 border-transparent rounded-full animate-spin"></div>
      <h1 className="mt-4 text-white text-2xl animate-bounce">Loading...</h1>
    </div>
  );
};

export default LoaderPage;
