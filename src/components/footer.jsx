import React from 'react';

const footer = () => {
  return (
    <div className='bg-black pt-11'>
      <ul className='flex p-6 justify-between md:flex-row md:justify-around '>
        <li>
      <p className="text-white text-lg md:mx-4">Phoebes Movies</p>
        </li>
        <li>
      <p className="text-white text-lg md:mx-4">123 Cool Road,<br/>Movie Lane<br/>Cool Kingdom</p>
        </li>
        <li>
      <p className="text-white text-lg md:mx-4">Contact Us</p>
        </li>
      </ul>
    </div>
  )
}

export default footer