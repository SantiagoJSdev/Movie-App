import axios from "axios";


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '811ecc1573802b7c5defd8ef28137995',
        language: 'es-ES'
    }
})

export default movieDB;