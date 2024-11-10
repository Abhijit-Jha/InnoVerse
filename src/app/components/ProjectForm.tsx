"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input'
import TextArea from './TextArea'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProjectForm = ({ setShowModal, editable = false, projectDetails }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>, editable?: boolean, projectDetails?: any }) => {

    const [title, setTitle] = useState<string>(projectDetails?.title || "");
    const [description, setDescription] = useState<string>(projectDetails?.description || "");
    const [image, setImage] = useState<string>(projectDetails?.image || "");
    const [techStack, setTechStack] = useState<string>(projectDetails?.tech_stack.join(",") || "");
    const [source_code, setSourceCode] = useState<string>(projectDetails?.source_code || "");
    const [live_Link, setLiveLink] = useState<string>(projectDetails?.live_Link || "");

    const handleSubmit = async () => {
        const data = {
            title,
            description,
            image,
            tech_stack: techStack,
            source_code,
            live_Link
        };
        console.log(data)
        const uploadedProject = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/project`, data)

        if (uploadedProject.status == 500) {
            toast.error("It's not you, it's us. Something went wrong.");
            return
        }

        if (!uploadedProject.data.authorized) {
            signIn()
        }
        if (!uploadedProject.data.success) {
            toast.error(uploadedProject.data.error)
            return;
        }
        toast.success("Project Uploaded Successfully")
        setTimeout(() => {
            setShowModal(false)
        }, 1000)
    }
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowModal(false);
            }
            if (event.key === "Enter") {
                event.preventDefault(); 
    
                if (!title || !description) {
                    toast.error("Provide Title and Description!");
                    return;
                }
    
                if (editable) {
                    handleChanges(); 
                } else {
                    handleSubmit();  
                }
            }
        };
    
        window.addEventListener('keydown', handleEscape);
    
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [setShowModal, title, description, editable]); 
    


    const handleChanges = async () => {
        if (!title || !description) {
            toast.error("Provide Title and Description!")
            return
        }
        const payload = {
            "p_id": projectDetails.p_id,
            "payload": {
                title: title,
                description: description,
                image: image,
                source_code: source_code,
                tech_stack: techStack,
                live_Link: live_Link,

            }
        }
        console.log(techStack)
        try {
            const resp = await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/project/update`, payload);
            toast.success("Project Details Updated Successfully")
            setTimeout(() => {
                setShowModal(false)
                window.location.reload()
            }, 1000)

        } catch (error) {
            console.error("Error updating project:", error);
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className='text-xl font-bold text-center mb-5'>
                Upload Your Project
            </div>
            <Input type='text' placeholder='Title..' label='Title' error='' onChange={(e) => { setTitle(e.target.value) }} value={title}></Input>
            <TextArea handleChange={(e) => setDescription(e.target.value)} value={description}></TextArea>
            <Input type='text' placeholder='Tech stacks...' label='Technologies Used(seperated by comma)' error='' onChange={(e) => { setTechStack(e.target.value) }} value={techStack}></Input>
            <Input type='text' placeholder='Provide image Link (Because i dont have a s3 store)...' label='Image' error='' onChange={(e) => setImage(e.target.value)} value={image}></Input>
            <Input type='text' placeholder='Repositary Link ...' label='Source Code' error='' onChange={(e) => setSourceCode(e.target.value)} value={source_code}></Input>
            <Input type='text' placeholder='Live Link ...' label='Preview' error='' onChange={(e) => setLiveLink(e.target.value)} value={live_Link}></Input>
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={editable ? handleChanges : handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                >
                    {editable ? "Update" : "Upload"}
                </button>
            </div>

        </div>
    )
}

export default ProjectForm
