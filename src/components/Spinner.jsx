import React from 'react'
import spinner from '../assets/spinner.svg'


export default function Spinner() {
  return (
    <div className='flex justify-center h-screen items-center bg-black bg-opacity-20'>
        <img className='w-[150px]' src={spinner}  alt='spinner'/>
    </div>
  )
}
