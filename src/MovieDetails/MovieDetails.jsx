import Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function MovieDetails() {
    let xx='https://image.tmdb.org/t/p/w500';
    const [theMovie, setTheMovie] = useState({});

    useEffect(() => {
        movieDetail(params.Id);
    }, []);

        let params=useParams()
        async function movieDetail(id)
        {
            let {data}= await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=68e77521cfd3cb1f427d0ba6fe08a6c7`)
            setTheMovie(data)
            console.log(data);
        };

return ( <>

    <div className='container w-75 bg-dr'>
    <h1 className='my-3 text-center'> movie Details</h1> 
    <hr className='w-50 m-auto mb-4'/>

        <div className='row'>
            <div className='col-lg-4'>
                <img src={theMovie.poster_path?xx+ theMovie.poster_path: xx+theMovie.backdrop_path} className="w-100" alt="" />
            </div>

            <div className='col-lg-7  mt-3 offset-1 '>
                <div className='ms-4 mt-5'>
                    <h1>{theMovie.title}</h1> 
                    <hr className='w-50'/> <br/>
                    <p className='fs-4 my-4'>{theMovie.overview}</p>
                    <h3 className='my-4'>vote Average : {theMovie.vote_average}</h3>
                    <h3 className='my-4'>vote Count : {theMovie.vote_count}</h3>
                    <h3>Date : {theMovie.release_date}</h3>
                </div>
            </div>
        </div>

    </div>
    
    </> );
}
