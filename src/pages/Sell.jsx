import React from 'react'
import { imageGallery } from '../assets/data'

export default function Sell() {
  return (
    <div>
        <div className='flex justify-center py-10'>
            <p className='text-2xl uppercase font-bold'> The Properties here has been listed for sell</p>
            </div>
       <div className='flex flex-wrap p-2 gap-2 justify-center'>
      {imageGallery.map((item, index) => (
        <div key={index}>
          <img src={item.url} className='w-[300px] h-[250px]' alt={`Image ${index + 1}`} />
          <p className='flex justify-center'>{item.description}</p>
        </div>
      ))}
      </div>
    </div>
  )
}