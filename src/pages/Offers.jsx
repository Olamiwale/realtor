import React from 'react'
import { imageGallery } from '../assets/data'

export default function Offers() {
  return (
    <div>
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
