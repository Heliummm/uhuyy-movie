import { useEffect, useState } from 'react';
import './App.css';
import {getMovielist, searchMovie} from './api'

const App = () => {
    const [PopularMovie, setPopularMovieS] = useState([])
    
    useEffect(() => {
        getMovielist().then((result) => {
            setPopularMovieS(result)
        })
    }, [])
    
    const PopularMovieList = () => {
        return PopularMovie.map((movie , i) => {
            return(
                <div className='Movie-wrapper' key={i} >
                    <div className='Movie-title' > {movie.title}</div>
                    <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
                    <div className='Movie-date'  >Release {movie.release_date}</div>
                    <div className='Movie-rate'>{movie.vote_average}</div>
                </div>
            )   
        })
    }

    const search = async (q) => {
        if (q.length >3) {
            const query= await searchMovie(q)
            setPopularMovieS(query.results)
        }
    }
    
    console.log({PopularMovie: PopularMovie})    
    
    return(
        <div className='App'>
            <header className='App-Header'>
                <h1>UHUYY MOVIE</h1>
                <input  placeholder='Cari Film Kesayangan'
                        className='Movie-search'
                        onChange={({target}) => search(target.value)}
                />
                <div className='Movie-container'>
                    <PopularMovieList/>
                </div>
            </header>
        </div>
    );
}

export default App;
