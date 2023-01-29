import { useState, useEffect } from "react";
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from "../interface/creditsInterface";
import { MovieFull } from "../interface/movieInterface";

 
interface MovieDetail {
    cast: Cast[];
    isLoading: boolean;
    movieFull?: MovieFull;
}

export const useMovieDetails = (moveId: number) => {
  
    const [state, setstate] = useState<MovieDetail>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    })

    const getmovieDetails = async () => {
      const movieDetailPromise = movieDB.get<MovieFull>(`/${moveId}`);
      const castPromise = movieDB.get<CreditsResponse>(`/${moveId}/credits`);
      
      const [movieDetailResp, castPromiseResp] = await Promise.all([movieDetailPromise, castPromise]);

      setstate({
        isLoading: false,
        movieFull: movieDetailResp.data,
        cast: castPromiseResp.data.cast
      })
      
    }

    useEffect(() => {
        getmovieDetails()
    }, [])
    
    return {
        ...state
    }
    
}
