import React from 'react'
import Link from 'next/link'
const NoProjects = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center text-gray-600 pt-24 space-y-4 mb-10">
            <svg
                className="w-16 h-16 text-gray-400 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m2 0a2 2 0 100-4h-1.5A1.5 1.5 0 0114 6.5V5a2 2 0 10-4 0v1.5A1.5 1.5 0 0110.5 8H9a2 2 0 100 4h6z"
                ></path>
            </svg>
            <p className="text-2xl font-semibold">No projects yet</p>
            <p className="text-lg text-gray-500">Start adding projects to see them here.</p>
            <div className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'>
            <Link href="/contribute">Contribute Now</Link>
            </div>
            
        </div>
    )
}

export default NoProjects
