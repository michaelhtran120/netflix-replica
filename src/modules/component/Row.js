import React, { useState, useEffect } from "react";
import "../../css/row.css";
import axios from "../../configs/axios";
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts={
    height: '390px',
    width: '100%',
    playerVars:{
      //https://developers.google.com/youtube.player_parameters,
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    console.log(movie)
    if(trailerUrl){
      setTrailerUrl('');
    } else {
      console.log(movie.name)
      movieTrailer(movie?.name || movie?.title || movie?.original_name ||'')
      .then((url) => {
        console.log(url)
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'))
      }).catch(error => {console.log(error)
      alert("No video/trailer available")})
    }
  }

  return (
    <div className='row'>
      <h2 className='row-title'>{title}</h2>

      <div className='row-posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
