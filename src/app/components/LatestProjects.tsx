
import React from 'react';
import Card from './Card';
import ProjectsById from './ProjectsById';
const LatestProjects = () => {

  return (
    <div className='flex justify-center items-center h-full'>
      <Card className='md:w-3/4 w-screen mt-6 h-full'>
        <div className='text-xl pl-8 pt-4'>Your Projects</div>
         <ProjectsById />
      </Card>
    </div>
  );
}

export default LatestProjects;
