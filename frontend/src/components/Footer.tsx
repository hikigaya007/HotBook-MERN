import React from 'react'

function Footer() {
  return (
    <div className='bg-blue-800 py-10 px-2'> 
        <div className='max-w-5xl mx-auto flex justify-between items-center'>
            <span className='text-3xl text-white font-bold tracking-tight'>
                HotBook
            </span>
            <span className='text-white font-bold tracking-tight flex gap-4'>
                <p className='cursor-pointer' >Privacy Policy</p>
                <p className='cursor-pointer' >Terms Of Services</p>
            </span>
        </div>
    </div>
  )
}

export default Footer