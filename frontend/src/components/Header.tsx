import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-blue-800 py-6 '>
        <div className='max-w-5xl mx-auto flex justify-between px-2 '>
            <span className='text-3xl text-white font-bold tracking-tight'>
                <Link to={'/'}>HotBook</Link>
            </span>
            <span className='flex space-x-2 '>
                <Link className='bg-white flex items-center text-blue-500 p-1 rounded-sm font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-75' to={'/sign-in'}>Sign in</Link>
            </span>
        </div>
    </div>
  )
}

export default Header;