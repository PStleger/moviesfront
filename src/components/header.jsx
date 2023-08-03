import React from 'react'
import { NavLink } from 'react-router-dom'

const header = () => {
return (
<header className="bg-opacity-0 absolute z-10">
<nav>
    <h1 className="text-indigo-500 text-8xl pl-4 pt-4">Filmklub</h1>
<ul className='flex flex-col p-6 md:flex-row'>
<li>
<NavLink className="hover:text-white text-lg md:mx-4 text-indigo-500 shadow-xl hover:shadow-indigo-600/30" to="/">Home</NavLink>
</li>
<li>
<NavLink className="hover:text-white text-lg text-indigo-500 shadow-xl hover:shadow-indigo-600/30" to="/movies/new">Add Movie</NavLink>
</li>
</ul>
</nav>
</header>
)
}


export default header
