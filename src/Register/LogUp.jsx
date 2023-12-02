import  Axios  from 'axios';
import Joi from 'joi';
import {useNavigate} from'react-router-dom';
import { useState } from 'react';
 // import $ from 'jquery'; 
// import { type } from '@testing-library/user-event/dist/type';

export default function LogUp() {
    let Navigate =useNavigate();
    const [errorList, setErrorList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [User, setUser] = useState({
        first_name:'',
        last_name:'',
        age:0,
        email:'',
        password:'',
        });

            function getUserData(e)
            {
                let MyUser={...User}; //deep Copy User
                MyUser[e.target.name]=e.target.value;
                setUser(MyUser);
                // console.log(MyUser);
            }

            async function submitRegisterForm(e)
            {
                e.preventDefault(); 
                setIsLoading(true);
                let validationResult =validateRegisterForm();
                // console.log(validationResult);
                if (validationResult.error) 
                {
                    setErrorList(validationResult.error.details); 
                    setIsLoading(false);
                }
                else
                {
                let {data}= await Axios.post('https://movies-api.routemisr.com/signup',User); 
                    if(data.message==='success')
                    {
                        setIsLoading(false);
                        Navigate('/Login');
                        setSuccess(data.message);
                        // console.log(success);
                    }
                    else
                    {
                        setIsLoading(false);
                        setError(data.message);
                        // console.log(error);
                    }
                    // console.log(data);  
                }
                
                

            }
                function validateRegisterForm()
                {
                    let schema =Joi.object({
                        first_name:Joi.string().alphanum().min(3).max(30).required(),
                        last_name:Joi.string().alphanum().min(3).max(30).required(),
                        age:Joi.number().integer().min(10).max(100),
                        email:Joi.string().email({ minDomainSegments: 2,tlds: { allow: ['com', 'net'] } }).required(),
                        password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required(),
                    })
                    return schema.validate(User ,{ abortEarly:false});
                }


                function ShowPassword()
                {
                    let x = document.getElementById('password').type;
                    if( x === 'password')
                    {
                        // console.log('z');
                        document.getElementById('password').type=('text');
                    }
                    else
                    {
                        // console.log('x');
                        document.getElementById('password').type=('password');
                    }
                }



return (<>
        <div className='container w-75 m-auto'>
            <h1 className='my-2'>Register</h1>

            <div className='w-75 m-auto'>            
                {errorList.map((error,i)=> <div key={i} className='alert alert-danger fs-5 py-1 rounded-pill text-center'>{error.message}</div> )}
                {error.length > 0?<div className='alert alert-danger rounded-pill'>{error}</div> :'' } 
            </div>

            <div>
            {success.length>0?<div className='alert alert-primary text-dark fs-4'>{success}</div>:''}  
            </div>

            <form onSubmit={submitRegisterForm}>
                <div className='my-1'>
                    <label htmlFor="first_name">First name </label>
                    <input  onChange={getUserData} className='form-control py-2 my-2 border-start-0 border-end-0 rounded-pill shadow' type="text" id='first_name'name='first_name'placeholder='first_name' />
                </div>
                <div className='my-1'>
                    <label htmlFor="last_name">Last name </label>
                    <input onChange={getUserData} className='form-control py-2 my-2 border-start-0 border-end-0  rounded-pill shadow' type="text" id='last_name'name='last_name' placeholder='last_name' />
                </div>
                <div className='my-1'>
                    <label htmlFor="age">Age </label>
                    <input onChange={getUserData} className='form-control py-2 my-2 border-start-0 border-end-0  rounded-pill shadow' type="number" id='age'name='age' placeholder='age' />
                </div>
                <div className='my-1'>
                    <label htmlFor="email">Email </label>
                    <input onChange={getUserData} className='form-control py-2 my-2 border-start-0 border-end-0 rounded-pill shadow' type="email" id='email'name='email' placeholder='...@gmail.com' />
                </div>
                <div className='my-1'>
                    <label htmlFor="password">Password </label>
                    <input onChange={getUserData} className='form-control my-2 border-start-0 border-end-0 rounded-pill shadow' type="password" id='password'name='password'placeholder='Pass... ' />
                </div>

                <button type='submit' className='btn btn-outline-info m-2 px-4 py-2 rounded-pill'>
                    {isLoading===true?<i className="fa-solid fa-spinner fa-spin"></i>:' Register '}
                </button>

                <span onClick={ShowPassword} id='ShowPassword'  className='btn btn-outline-light border rounded-pill border-0'>Show Password</span>
            </form>
        </div>
        </>);
}