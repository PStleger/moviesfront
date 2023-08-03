import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const UpdateMovie = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState({}); // Initialize as an empty object

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        setTitle(res.data.title);
        setDirector(res.data.director);
        setYear(res.data.year);
        setGenre(res.data.genre);
        setPoster(res.data.poster);
        setRating(res.data.rating);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", { title, director, year, genre, rating, poster }); // Check the form data before sending the API request
    axios
      .put(`${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`, {
        title,
        director,
        year,
        genre,
        rating,
        poster,
      })
      .then((res) => navigate(`/movies/${id}`))
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-black pt-48 text-white">
      {/* <h2>Update Movie</h2> */}
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <label className='pt-4' htmlFor="">Title</label>
        <input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
          type="text"
          name="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='pt-4' htmlFor="">Director</label>
        <input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
          type="text"
          name="director"
          value={director || ""}
          onChange={(e) => setDirector(e.target.value)}
        />
        <label className='pt-4' htmlFor="">Year</label>
        <input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
          type="text"
          name="year"
          value={year || ""}
          onChange={(e) => setYear(e.target.value)}
        />
        <label className='pt-4' htmlFor="">Poster</label>
        <input className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
          type="text"
          name="poster"
          value={poster || ""}
          onChange={(e) => setPoster(e.target.value)}
        />
        <label className='pt-4' htmlFor="genre">Genre</label>
        <select className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 focus:bg-indigo-600/20 py-2 px-4 mt-2 inline-block"
          name="genre"
          value={genre || ""}
          onChange={(e) => setGenre(e.target.value)}
        >
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
        <button className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 py-2 px-4 mt-4 inline-block">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
