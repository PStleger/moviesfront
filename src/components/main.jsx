import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Movies from './Movies';
import NewMovies from './NewMovies';
import MovieDetails from './MovieDetails';
import UpdateMovie from './UpdateMovie';

const main = () => {
return (
<div>
<Routes>
<Route path="/" element ={<Movies/>}/>
<Route path="/movies/new" element ={<NewMovies/>}/>
<Route path="/movies/:id" element ={<MovieDetails />}/>
<Route path="/movies/:id/update" element ={<UpdateMovie/>}/>
</Routes>
</div>
)
}


export default main
