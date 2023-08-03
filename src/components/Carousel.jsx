import "tw-elements";
import { Carousel, initTE } from "tw-elements";
import { useState, useEffect } from "react";
import axios from "axios";

initTE({ Carousel });

const MyCarousel = () => {
  const [movies, setMovies] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showVideo, setShowVideo] = useState(false); // New state for showing video

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/movies`)
      .then((res) => setMovies(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Start a timeout when hovering and set showVideo to true after 3 seconds
    if (hoveredIndex !== -1) {
      const timeoutId = setTimeout(() => {
        setShowVideo(true);
      }, 2000);

      // Clear the timeout when the component unmounts or the hovered index changes
      return () => clearTimeout(timeoutId);
    }

    // Reset showVideo when not hovering
    setShowVideo(false);
  }, [hoveredIndex]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === 0 ? movies.length - 1 : prevSlide - 1
    );
    setHoveredIndex(-1); // Clear hover on slide change
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === movies.length - 1 ? 0 : prevSlide + 1
    );
    setHoveredIndex(-1); // Clear hover on slide change
  };

  if (!movies) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* ... Other carousel components ... */}
  
      {/* Carousel items */}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {movies
          .filter((movie) => movie.rating > 8)
          .map((movie, index) => (
            <div
              key={movie.id}
              className={`relative float-left ${
                activeSlide === index ? "-mr-[100%]" : "hidden"
              } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              data-te-carousel-item
              data-te-carousel-active={activeSlide === index ? true : undefined}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex(-1); // Reset hoveredIndex on mouse leave
                setShowVideo(false); // Clear showVideo when leaving
              }}
            >
              {/* Hide the image on hover */}
              <img
                className={`block h-1/3 mx-auto  ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
                src={movie.poster}
                alt={movie.title}
              />
              
              {/* Show the video on hover */}
              {hoveredIndex === index && (
                <video
                  className={`absolute inset-0 w-full h-full rounded-full opacity-${
                    showVideo ? "100" : "0"
                  } transition-opacity duration-300`}
                  src="src/assets/FG.mp4"
                  alt={movie.title}
                  controls autoPlay
                ></video>
              )}
  
              {/* Show "Hello" if not hovering or if video is not showing */}
              {(hoveredIndex !== index || !showVideo) && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                  <p>{movie.title}<br/>{movie.year}</p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* ... Other carousel controls ... */}
    </div>
  );
};

export default MyCarousel;
