"use client"
import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { redirect } from 'next/navigation'

const UserDetails = () => {
    const session = useSession()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [save, setSave] = useState(false)

    useEffect(() => {
        if (session?.data?.user) {
            setName(session.data.user.name || "");
            setEmail(session.data.user.username || session.data.user.email || "");
        }
    }, [session]);

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
        setSave(true)
    }

    async function handleUpdateName() {
        const updatedUser = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/addName`, {
            name: name
        })

        if (!updatedUser?.data.success) {
            toast.error(updatedUser?.data.error)
        } else {
            toast.success(updatedUser.data.message)
            setSave(false)
        }
    }
    // console.log(session)
    return (
        <div className='flex justify-center items-center'>
            <ToastContainer />
            {/* {JSON.stringify(session)}*/}
            <ProjectCard className="p-6 bg-white rounded-lg shadow-lg w-3/4 mt-4">
                <div className='flex items-center space-x-6'>
                    <img
                        src={session.data?.user?.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                        alt='Profile Picture'
                        className='md:w-40 md:h-40 w-24 h-24 rounded-full'
                    />
                    <div className='flex-grow'>
                        <div className='flex items-center space-x-4 mb-4'>
                            <input
                                type='text'
                                value={name}
                                onChange={handleNameChange}
                                className='w-full bg-slate-200 h-12 p-4 border border-emerald-950 rounded-lg'
                                placeholder="What Should We Call You?"
                            />
                            {save && (
                                <button
                                    onClick={handleUpdateName}
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 md:flex hidden"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                        <div>
                            <input
                                type='text'
                                value={email}
                                readOnly
                                className='w-full bg-slate-200 h-12 p-4 border border-emerald-950 rounded-lg cursor-not-allowed'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mt-6 space-x-5'>
                    {save && (
                        <button
                            onClick={handleUpdateName}
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 md:hidden flex"
                        >
                            Update
                        </button>
                    )}
                    <button
                        onClick={() => {
                            signOut()
                            redirect("/")
                        }}
                        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm px-4 py-2"
                    >
                        Logout
                    </button>
                </div>
            </ProjectCard>
        </div>
    )
}

export default UserDetails
