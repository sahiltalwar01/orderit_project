import React, { useEffect } from 'react'
import Loader from '../layout/Loader'
import { login,clearErrors } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const alert = useAlert()
    const dispatch = useDispatch()
    const {isAuthenticated,loading,error} = useSelector((state)=>state.auth)
    useEffect(()=>{
        if(isAuthenticated){
            window.location.href = '/'
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
    },[dispatch,error,alert,isAuthenticated])
    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(login(email,password)).then(()=>{
            if(isAuthenticated){
                window.location.href = '/'
            }
            else{
                alert.error("Login failed")
                dispatch(clearErrors())
            }
        }).catch((error)=>{
            alert.error("Login failed")
            dispatch(clearErrors())
        })
    }
  return (
    <>
     {
        loading ?  (
            <Loader/>

        ):(
            <>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler}>
                        <h1 className='mb-3'>
                            Login
                        </h1>
                        <div className='form-group'>
                            <label htmlFor='email_feild'>Email</label>
                            <input type='email' id='email_feild' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password_feild'>Password</label>
                            <input type='password' id='password_feild' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <Link to="/users/forgetPassword" className='float-right mb-4'>Forgot Password </Link>
                        <button id='login_button'
                        type='submit'
                        className='btn btn-block py-3'>LOGIN</button>

                        <Link to='/users/signup' className='float-right mt-3'>
                            New User
                            </Link>

                    </form>
                </div>
            </div>
            </>
        )
     } 
    </>
  )
}

export default Login
