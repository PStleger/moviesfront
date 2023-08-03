import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";
import Carousel from "./Carousel";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/movies`)
      .then((res) => setMovies(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="bg-black relative">
<Carousel/>
      <h2 className=" text-white text-5xl text-center pt-14 pb-10">Movie List</h2>
      <ul className="grid-cols-fluid grid gap-4 px-8">
        {movies &&
          movies.map((movies) => (
            <li key={movies.id}>
              <Link to={`/movies/${movies.id}`}>                
                <img className="shadow-2xl hover:shadow-indigo-500/90" src={movies.poster} alt={movies.title} />
                <p className="text-center text-white pt-3">
                  {movies.title}
                  <br /> Directed By {movies.director}
                  <br />
                </p>
                <div className="flex justify-center lg:pb-5">
                  <StarRating rating={movies.rating} />
                  </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;
