import React from 'react'

const Card = ({children,className}:{children :React.ReactNode,className? : string}) => {
  return (
    <div className={`${className} h-auto bg-white shadow-2xl rounded-xl`}>
      {children}
    </div>
  )
}

export default Card
