import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import React from 'react';
import {useState} from 'react';
import StarRating from './StarRating';

const NewMovies = () => {
  const [title, setTitle]=useState('');
  const [director, setDirector]=useState('');
  const [year, setYear]=useState('');
  const [genre, setGenre]=useState('');
  const [rating, setRating]=useState(0);
  const navigate = useNavigate();

const handleSubmit=e=>{
e.preventDefault();
console.log('Form Data:', { title, director, year, genre, rating }); // Check the form data before sending the API request

axios
.post(`${import.meta.env.VITE_SERVER_BASE_URL}/movies`,{title,director,year,genre,rating})
      .then((res) => navigate("/"))
      .catch((error) => console.log(error));
};

  return (
    <div className='bg-black pt-48 text-white'>
      {/* <h2 className='mx-20'>Add Movie</h2> */}
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
<label className='pt-4' htmlFor="">Title</label>
<input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block" type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)}></input>
<label className='pt-4' htmlFor="">Director</label>
<input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block" type="text" name="director" onChange={e=>setDirector(e.target.value)}></input>
<label className='pt-4' htmlFor="">Year</label>
<input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block" type="text" name="year" onChange={e=>setYear(e.target.value)}></input>
<label className='pt-4' htmlFor="genre">Genre</label>
      <select className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
 name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select a genre</option>
        <option value="Romance">Romance</option>
        <option value="Comedy">Comedy</option>
        <option value="Rom-Com">Rom-Com</option>
        <option value="Comedy Drama">Comedy Drama</option>
        <option value="Biography">Biography</option>
        <option value="Psychological thriller">Psychological thriller</option>
      </select>
      <label className='pt-4' htmlFor="rating">Rating</label>
        <StarRating rating={rating} setRating={setRating} />
      <button className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 py-2 px-4 mt-4 inline-block"
>Add Movie</button>
      </form>
    </div>
  )
}

export default NewMovies