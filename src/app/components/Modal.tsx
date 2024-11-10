"use client"
import React from 'react'
import ProjectCard from './ProjectCard'
import ReactDOM from 'react-dom'
import ProjectForm from './ProjectForm'
const Modal = ({ setShowModal,data }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>,data? : any}) => {
    return ReactDOM.createPortal(
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50'>
            <ProjectCard className='bg-white max-h-[90vh] w-3/4 md:w-1/2 overflow-y-auto p-8 rounded-lg'>
                <ProjectForm setShowModal = {setShowModal} projectDetails={data} editable={data? true : false}/>
            </ProjectCard>
        </div>, document.body
    )
}

export default Modal
