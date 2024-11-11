"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Modal from './Modal'


export interface ProjectType {
  p_id : string
  title: string,
  name?: string
  description: string,
  image: string | null,
  live_Link: string | null,
  source_code: string | null,
  tech_stack: string[],
  uploadedBy? : string,
  isProfile?: boolean
}



const ProjectContent = (payload: ProjectType) => {
  const [modalOpen, setModalOpen] = useState(false)
  const handleNoLink = () => {
    toast.info("No Link Provided")
  }

  return (
    <>
      <ToastContainer />
      <ProjectCard>
        <div className='w-full'>

          <div className='flex items-center space-x-4'>
            <img
              src={payload.image ? payload.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
              className='w-32 h-32'
            />
            <div className='w-full'>
              <div className='flex justify-between'>
                <div className='font-bold text-xl cursor-pointer hover:underline'>
                  {payload.title}
                </div>
                <div className='flex space-x-4'>
                  <div
                    className='text-blue-500 cursor-pointer hover:underline md:flex hidden'
                    onClick={() => payload.source_code ? window.open(payload.source_code, "_blank") : handleNoLink()}
                  >
                    Code
                  </div>
                  <div
                    className='text-blue-500 cursor-pointer hover:underline md:flex hidden'
                    onClick={() => payload.live_Link ? window.open(payload.live_Link, "_blank") : handleNoLink()}
                  >
                    Preview
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='mt-4 font-light text-sm w-full'>
            {payload.description}
          </div>


          <div className='flex md:hidden'>
            <div className='flex justify-between space-x-12 p-2 items-center mt-4 '>
              <div
                className='text-blue-500 cursor-pointer hover:underline '
                onClick={() => payload.source_code ? window.open(payload.source_code, "_blank") : handleNoLink()}
              >
                Code
              </div>
              <div
                className='text-blue-500 cursor-pointer hover:underline '
                onClick={() => payload.live_Link ? window.open(payload.live_Link, "_blank") : handleNoLink()}
              >
                Preview
              </div>
            </div>
          </div>


          <div className='md:pl-4  mt-4'>
            {payload.tech_stack?.length ? "Tech stack Used : " : ""}
          </div>

         
              <div className="flex items-center justify-between">
                <div className='flex space-x-2 items-center '>
                {(payload.tech_stack).slice(0, 3).map((tech: string, index: number) => (
                  <div
                    key={index}
                    className="text-white text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded-full cursor-pointer"
                  >
                    {tech}
                  </div>
                ))}
                </div>
                <div>
                {payload.isProfile && <div className='cursor-pointer items-end' onClick={() => { setModalOpen(true) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-slate-500 transition ease-in-out">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </div>}
                
            </div>


          </div>
          {/* Blunder Here */}
          <div className='flex justify-between items-center'>
            {!payload.isProfile &&
              <div className='w-48 mt-4 font-extralight text-sm text-slate-400'>
                Uploaded By {payload.uploadedBy || payload.uploadedBy?.includes("@") ? payload.uploadedBy.split("@")[0] : "" }
              </div>
            }
          </div>
        </div>
        {modalOpen && <Modal setShowModal={setModalOpen} data={payload}/>}
      </ProjectCard>
    </>
  )
}

export default ProjectContent
