import React  from 'react';
import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
import  Joi from 'joi';
// import Home from './../Home/Home';








export default function Login(props) {
        let Navigate=useNavigate()
        const [isloading, setIsLoading] = useState(false);
        const [errorList, seterrorList] = useState([]);
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
        const [UserData, setUserData] = useState({
            email:'', 
            password:'',
        });
       
    
        function getDataForm(e)
        {
            let MyUserData ={...UserData};
            MyUserData[e.target.name]=e.target.value;
            setUserData(MyUserData);
            // console.log(MyUserData);
        };

        

        async function checkDataForm(e)
        {
            e.preventDefault();
            setIsLoading(true);
            
            let ValidationForm=ValidateRegisetrForm();
            if(ValidationForm.error)
            {
                setIsLoading(false);
                seterrorList(ValidationForm.error.details);
                // console.log(ValidationForm);
            }
            else
            {
                let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin', UserData);
                if(data.message==='success')
                {
                    setIsLoading(false);
                    localStorage.setItem('UserToken', data.token);
                    props.saveUserData();//بيعرض الداتا لما يعمل لوجين
                    Navigate('/Home');
                    setSuccess(data.message);//بيعرض رساله انه تم تسجل الدخول
                }
                else
                {
                    setIsLoading(false);
                    setError(data.message);
                }
                // console.log(data);
            }
        };

            // ask-your-data-success
        function ValidateRegisetrForm()
        {
            let schema=Joi.object({
                email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
                password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required(),
            });
            // console.log(schema)
            return schema.validate(UserData,{abortEarly:false});
        };

            // button-show-password
        function ShowPassword()
        {
            let Show = document.getElementById('password').type;
                if( Show==='password')
                {
                    document.getElementById('password').type=('text');
                }
                else
                {
                    document.getElementById('password').type=('password');
                }
        }

  return (<>
          <div className='container w-75 m-auto'>
          <h1 className='my-2'>Log In</h1>
              <form onSubmit={checkDataForm}>
                  <div>
                    {errorList.map((error)=><div className='alert alert-danger py-2'>{error.message}</div>)}
                    {error.length>0?<div className='alert alert-danger py-2'>{error}</div>:''}
                  </div>
                  <div>
                    {success.length>0?<div className='alert alert-primary text-dark fs-4'>{success}</div>:''}  
                  </div>
                  <div>
                      <label htmlFor="email">Email </label>
                      <input onChange={getDataForm} className='form-control py-2 my-2 border-start-0 border-end-0  rounded-pill shadow' type="email" id='email'name='email'placeholder='. . . @gmail.com' />
                  </div>
                  <div>
                      <label htmlFor="password">password </label>
                      <input onChange={getDataForm} className='form-control py-2 my-2 border-start-0 border-end-0  rounded-pill shadow' type="password" id='password'name='password'placeholder='Pass . . .' />
                  </div>

                <button type='submit' className='btn btn-outline-info rounded-pill m-2 px-3 py-2'>
                    {isloading===true? <i className='fa-solid fa-spinner fa-spin'></i>:'Login'} 
                </button>

                  <span onClick={ShowPassword}  className='btn btn-outline-light border rounded-pill border-0'>Show Password</span>

              </form>
          </div>

      </> );
}
