import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import StarRating from "./StarRating"; // Use the correct relative path

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`)
      .then((res) => setMovies(res.data))
      .catch((error) => setError(error.response?.data?.message));
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`)
      .then((res) => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-black">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies && (
        <div>
          <img
            className="pt-28 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-auto mx-auto"
            src={movies.poster}
            alt={movies.title}
          />
          <div className="text-center">
            <h2 className="text-white">{movies.title}</h2>
            <p className="text-white">
              {movies.year} Directed By {movies.director}
            </p>
            <StarRating rating={movies.rating} />
          </div>
          <div className="text-center">
            <Link
              className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 py-2 px-4 mt-4 inline-block"
              to={`/movies/${id}/update`}
            >
              Update Movie
            </Link>{" "}
            <button
              className="text-white bg-indigo-600/40 rounded-lg transition ease-in duration-300 shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 py-2 px-4 mt-4 ml-2"
              onClick={handleDelete}
            >
              Delete Movie
            </button>
          </div>
        </div>
      )}
      {!movies && <div>Loading...</div>}
    </div>
  );
};

export default MovieDetails;
