import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

const Header = () => {
  return (
    <div className='w-full text-white bg-gray-800'>
        <div className='flex justify-between max-w-2xl w-full m-auto'>
            <Link to={'/'}>
              Logo
            </Link>
            <Navigation />
        </div>
    </div>
  )
}

export default Header