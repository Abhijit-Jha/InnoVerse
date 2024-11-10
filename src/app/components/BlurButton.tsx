"use client"
import React from 'react'

const BlurButton = ({ text ,handleClick}: { text: string,handleClick:()=>void }) => {
    return (
        <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

export default BlurButton
