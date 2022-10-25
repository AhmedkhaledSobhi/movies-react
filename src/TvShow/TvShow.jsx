import Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
let xx='https://image.tmdb.org/t/p/w500';



export default function TvShow() {
              const [tvShow, setTvShow] = useState([]);
              useEffect(() => {
                getMovieDb();

                },[]);

            async function getMovieDb()
            {
              let {data} = await Axios.get(`https://api.themoviedb.org/3/tv/25?api_key=68e77521cfd3cb1f427d0ba6fe08a6c7&language=en-US`);
              setTvShow(data.created_by);
              console.log(data.created_by);
            }
  return (<>

            <div className='container w-75 m-auto'>
                <div className='row g-3'>
                <div className='col-md-3'>
                    <div className='pt-5 d-flex justify-content-center align-items-center fle-column'>
                      <div className='m-1'>
                        
                        <hr className='mb-5'/>
                        <h3 className='my-3'>Trending movies to watch Now</h3> 
                        <p>Lorem ipsum dolor sit.</p>
                        <hr className='mt-5'/>
                      </div>
                    </div>
                  </div>
                  {tvShow.map((movie ,i)=> <div key={i} className='col-md-3'>
                  <Link to={`/movieDetails/${movie.id}`} >

                    <div>
                      <img src={xx+movie.profile_path} alt="" className='w-100' />
                      <h5>{movie.name}</h5>
                    </div>
                  </Link>
                  </div> )}
                </div>
              </div> 
    </>);
}
