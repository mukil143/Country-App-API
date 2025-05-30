import React from 'react'

const Loading = () => {
  return (
    <div className='flex  flex-col h-dvh justify-center items-center' >
        <div className='animate-spin h-12 w-12 border-t-4 rounded-full border-blue-500 border-solid '></div>
        <p className='mt-4 text-xl' >Loading...</p>
    </div>
  )
}

export default Loading