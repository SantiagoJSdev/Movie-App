import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDbMoviesResponseg } from "../interface/movieInterface";

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upComing: Movie[];
}

export const useMovies = () => {

  const [isloading, setIsLoading] = useState(true)
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComing: []
  })

  const getMovies = async () => {
    const nowPlayingPromises = movieDB.get<MovieDbMoviesResponseg>('/now_playing');
    const popularPromises = movieDB.get<MovieDbMoviesResponseg>('/popular');
    const topRatedPromises = movieDB.get<MovieDbMoviesResponseg>('/top_rated');
    const topComingPromises = movieDB.get<MovieDbMoviesResponseg>('/upcoming');

    const response = await Promise.all([nowPlayingPromises, popularPromises, topRatedPromises, topComingPromises])

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upComing: response[3].data.results
    })


    setIsLoading(false);
  }

  useEffect(() => {
    getMovies();

  }, [])

  return {
    ...moviesState,
    isloading,
  }
}
