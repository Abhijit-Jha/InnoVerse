import React from 'react'


const ProjectCard = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <div className={`${className} shadow-lg w-full md:w-3/4 p-4 h-auto rounded-lg  min-h-40`}>
      {children}
    </div>
  )
}

export default ProjectCard
