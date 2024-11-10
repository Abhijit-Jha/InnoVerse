"use client"
import React, { useState } from 'react';
import logo from "../store/image/logo.png";
import SearchBox from './SearchBox';
import Link from "next/link"
import { usePathname } from 'next/navigation'
import Hamburger from './Hamburger';


const Header = () => {
  const path = usePathname()
  const [selected, setSelected] = useState("For You")
  const [menu, setIsMenu] = useState(false)
  const handleSelect = (value: string) => {
    setSelected(value)
  }


  return (
    <div className='h-24 bg-blue-700 flex justify-between items-center md:px-10 px-4  fixed top-0 left-0 z-10 w-screen md:w-full' suppressHydrationWarning={true}>
      <div className='md:px-10 px-4 flex items-center'>
        <img src={logo.src} alt="Logo" className='w-32 cursor-pointer' />
      </div>
      <div className='hidden lg:flex flex-1 mx-10'>
        <SearchBox />
      </div>
      <div className='md:hidden overflow-hidden flex justify-center items-center' onClick={() => setIsMenu(!menu)}>
        <Hamburger isOpen={menu} />
      </div>

      <div className='hidden md:flex space-x-8 px-10 text-white'>
        <Link href="/foryou">
          <span className={`cursor-pointer hover:underline ${(selected == "For You" && path == "/foryou") || path == "/foryou" ? "text-gray-900" : ""}`} onClick={() => {
            handleSelect("For You")
          }}>For You</span>
        </Link>
        <Link href="/contribute">
          <span className={`cursor-pointer hover:underline ${(selected == "Contribute" && path == "/contribute") || path == "/contribute" ? "text-gray-900" : ""} `} onClick={() => {
            handleSelect("Contribute")
          }}>Contribute</span>
        </Link>
        <Link href="/profile">
          <span className={`cursor-pointer hover:underline ${(selected == "Profile" && path == "/profile") || path == "/profile" ? "text-gray-900" : ""}`} onClick={() => handleSelect("Profile")}>Profile</span>
        </Link>
      </div>
      {menu && (
        <div className='md:hidden absolute top-24 left-0 w-full h-auto bg-blue-700 p-4 '>
          <Link href="/foryou">
            <span
              className={`block m-6 text-white ${selected === "For You" ? "text-gray-900" : ""}`}
              onClick={() => {
                handleSelect("For You")
                setIsMenu(false)
              }}
            >
              For You
            </span>
          </Link>
          <Link href="/contribute">
            <span
              className={`block m-6 text-white ${selected === "Contribute" ? "text-gray-900" : ""}`}
              onClick={() => {
                handleSelect("")
                setIsMenu(false)
              }}
            >
              Contribute
            </span>
          </Link>
          <Link href="/profile">
            <span
              className={`block m-6 text-white ${selected === "Profile" ? "text-gray-900" : ""}`}
              onClick={() => {
                handleSelect("Profile")
                setIsMenu(false)
              }}
            >
              Profile
            </span>
          </Link>
        </div>
      )}

    </div>
  );
}

export default Header;
