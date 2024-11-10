"use client"
import React, { useState } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import DividerWithOr from '../components/DivideWithOr'
import Google from '../components/Google'
import Link from "next/link"
import { SignUpSchema } from '../zod'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {signIn} from "next-auth/react"
import { ZodIssue } from 'zod'

const Signup = ({Title}:{Title:string}) => {
    const route = useRouter()
    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [passwordError,setPasswordError] = useState<string>("")
    const [usernameError,setusernameError] = useState<string>("")

    const validateUser = ()=>{
        const response = SignUpSchema.safeParse({
            username : username,
            password : password
        })
        setusernameError("")
        setPasswordError("")
        if(!response.success){
            response.error.errors.forEach((e:ZodIssue)=>{
                const path = e.path[0]
                if(path=="username"){
                    // console.log(usernameError)
                    setusernameError(e.message)
                    toast.error(usernameError)
                }else if(path == "password"){
                    setPasswordError(e.message)
                    toast.error(passwordError)
                }

            })
            return
        }
    }
    const signup = async () => {
        validateUser()

        try{
            const user = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/signup`,{
                username,
                password
            })
            if(!user){
                return
            }
            if(user.data.error){
                toast.error(user.data.error)
                return;
            }
            
            toast.success("Successfully Signed Up")
            route.push("/auth/signin")
        }catch(e:unknown){
            // console.log(e)
        }
        
    }

    const signin = async()=>{
        // validateUser()
        const res = await signIn("credentials",{
            username,
            password,
            redirect:false,
            
        })
        // console.log(res)
        if(!res?.ok){
            toast.error("Check your Password and email and Try again!!")
            return
        }
        toast.success("Login Successful")
        route.push("/")
    }
    return (
        <div className='flex justify-center  bg-blue-700 w-full h-screen items-center'>
            <Card className='lg:w-1/4'>
                <ToastContainer/>
                <div className='flex justify-center items-center font-semibold text-xl pt-10 '>{Title}</div>
                <div className='m-10 mt-6'>
                    <Input type='text' label="Username" placeholder='Email or Phone' error={usernameError} onChange={(e)=>{
                        setUsername(e.target.value)
                    }}></Input>
                    
                    <Input type='password' label="Password" placeholder='•••••••••' error={passwordError} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></Input>

                </div>

                <div className='flex justify-center m-4 mb-0'>
                    <Button text={Title} handleClick={Title=="Sign Up" ? signup : signin} />
                </div>
                {Title=="Sign Up" ? <span className='flex justify-center text-sm font-light mt-1'>
                    Already Created?
                    <Link href="signin" className='cursor-pointer text-blue-400'>SignIn</Link>
                </span> : <span className='flex justify-center text-sm font-light mt-1 mx-2'>
                    Create New Account!!&nbsp;
                    <Link href="signup" className='cursor-pointer text-blue-400'>{"   "}   SignUp</Link>
                </span> }
                <DividerWithOr />
                <Google />
            </Card>
        </div>
    )
}

export default Signup
