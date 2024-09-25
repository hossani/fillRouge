'use client'
import React from 'react'
const Cardmessage = ({content,fullName,picture,onClick  }) => {
  
  return (
    <>
    <div  onClick={onClick}
     className="relative border border-gray-200 hover:bg-yellow-300 rounded-lg shadow-lg cursor-pointer">
  
    <div className="flex items-center p-4">
      <img
        className="object-cover w-12 h-12 rounded-lg"
        src={picture}
        alt=""
      />
      <div className="ml-3 overflow-hidden">
        <p className="font-medium text-gray-900">{fullName}</p>
        <p className="max-w-xs text-sm text-gray-500 truncate">
          Message: {content}
        </p>
      </div>
    </div>
  </div>
</>
  )
}

export default Cardmessage;