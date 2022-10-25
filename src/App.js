// import logo from './logo.svg';
import './App.css';


import Home  from './Home/Home';
import Movies from './Movies/Movies';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import TvShow from './TvShow/TvShow';
import PePole from './PePole/PePole';
import About from './About/About';
import LogUp from './Register/LogUp';
import Login from './LogIn/Login';
import MovieDetails from './MovieDetails/MovieDetails';
import { useState ,useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Routes ,Route, Navigate ,useNavigate} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';





export default function App() {

      let navigates=useNavigate();
      const [userData, setUserData] = useState(null);

      function saveUserData()
      {
        let endCodedToken= localStorage.getItem('UserToken');
        let deCodedToken=jwtDecode(endCodedToken);
        setUserData(deCodedToken);
      }

      function LogOut()
      {
        setUserData(null);
        localStorage.removeItem('UserToken');
        navigates('/Login');
      }
        useEffect(() => {

        if(localStorage.getItem('UserToken'))
        { saveUserData(); }

        }, []);

        function ProtectedRoute(props)
        {
          if( localStorage.getItem('UserToken')===null)
          {
            return <Navigate to='/Login'/>;
          }
          else
          {
            return props.children;
          }
        }

    return (<div className='mt-5 mb-5'>
    
    <Navbar LogOut={LogOut} userData={userData}/>
      <Routes>
        <Route path='' element={ <ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path='movies-react' element={ <ProtectedRoute> <Home/> </ProtectedRoute>}/>

        <Route path='Home' element={<ProtectedRoute> <Home/> </ProtectedRoute> }/>
        <Route path='Movies' element={ <ProtectedRoute> <Movies/> </ProtectedRoute> }/>
        <Route path='movieDetails' element={ <ProtectedRoute> <MovieDetails/> </ProtectedRoute> }>
            <Route path=':Id' element={ <ProtectedRoute> <MovieDetails/> </ProtectedRoute> }/>
        </Route>

        <Route path='TvShow' element={<ProtectedRoute> <TvShow/> </ProtectedRoute> }/>
        <Route path='About' element={<ProtectedRoute> <About/> </ProtectedRoute> }/>
        <Route path='PePole' element={<ProtectedRoute> <PePole/> </ProtectedRoute> }/>
        <Route path='Register' element={<LogUp/>}/>
        <Route path='Login' element={<Login saveUserData={saveUserData}/>}/>
        <Route path='*' element={<div><h1 className='text-danger text-center fs-1 fw-bolder mt-5 d-flex justify-content-center align-items-center '> Not found 404</h1></div>} /> 
      </Routes>
    <Footer/>
    </div>
  );
}
