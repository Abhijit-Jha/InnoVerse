"use client"
import React, { useState } from 'react'
import BlurButton from './BlurButton'
import ProjectCard from './ProjectCard'
import Modal from './Modal'

const UploadProject = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <div className="flex justify-center items-center mt-52 ">
                <ProjectCard className={`${showModal? "invisible": ""}  bg-white shadow-xl rounded-lg border border-dashed border-slate-800 p-8 `}>
                    <div className='space-y-8 text-center mt-8'>
                        <div className='text-lg text-gray-700'>
                            Ready to share your project with the world? <br />
                            Upload your project details below to showcase your work and collaborate with others.
                        </div>
                        <div className='text-md text-gray-600'>
                            Have a project to share? Click the button below to submit your work and add it to our platform.
                        </div>
                        <div className='mt-6'>
                            <BlurButton
                                text='Upload Now'
                                handleClick={() => { setShowModal(true) }}
                            />
                        </div>
                    </div>
                </ProjectCard>

            </div>
            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    )
}

export default UploadProject
