import  Axios  from 'axios'
// import { data } from 'jquery';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
let xx='https://image.tmdb.org/t/p/w500';

export default function PePole() {
  const [theMovie, setTheMovie] = useState([]);
    useEffect(() => {
      getMovieDb();

      }, []);

  async function getMovieDb()
  {
    let {data} = await Axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1AJYANCOTW3XzdIgoNHTOOZHi3YDNaM9vQuOA7VJdyG4Qsjl5SvtUrHtk`);
    setTheMovie(data.results);
    // console.log(data);
  };


  return (<>
            {/* <h1>Home</h1>  */}
                
              <div className='container w-75 m-auto'>
                <div className='row justify-content-center g-3'>
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

                  {theMovie.map((movie , i)=> <div key={i} className='col-md-3'>
                    <Link to={`/movieDetails/${movie.id}`} >
                      
                    <div className='position-relative'>
                    <div className='bg-info position-absolute top-0 end-0 p-2'>
                          {movie.vote_count}
                      </div>
                      <img src={xx+movie.poster_path} alt="" className='w-100' />
                      <h5>{movie.title? movie.title:movie.name}</h5>
                    </div>
                    </Link>
                    
                  </div> )}
                </div>
              </div>
          </>
              
  );
}
