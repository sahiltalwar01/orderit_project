import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userAction';



const Register = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        passwordConfirm:"",
        phoneNumber:"",
    })
    const {name,email,password,passwordConfirm,phoneNumber} = user;
    const [avatar,setAvatar] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("")
    const {isAutenticated,loading,error} = useSelector((state)=>state.auth);
    useEffect(()=>{
    if(isAutenticated){
    window.location.href = '/';
    }
    if(error){
        alert.error(error);
        dispatch(clearErrors())
    }
},[dispatch,alert,isAutenticated,error])


const submitHandler =(e)=>{
    e.preventDefault();
    if(password !== passwordConfirm){
        alert.error("Password does not match")
        return;
    }

    const formData = new FormData();
    formData.set("name",name)
    formData.set("email",email)
    formData.set("password",password)
    formData.set("passwordConfirm",passwordConfirm)
    formData.set("phoneNumber",phoneNumber)
    formData.set("avatar",avatar)
    dispatch(register(formData));

}
const onChange = (e)=>{
    if(e.target.name==="avatar"){
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    else{
        setUser({...user,[e.target.name]: e.target.value})
    }
}

  return (
    <>
        <div className='row wrapper'>
            <div className='col-10 col-lg-5 registration-form'>
                <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 className='mb-3'> Register</h1>
                    <div className='form-group'>
                        <label htmlFor='name_feild'>Name</label>
                        <input type='text' id='name_feild' className='form-control' name='name' value={name} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' className='form-control' name='email' value={email} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password_feild'>Password</label>
                        <input type='password' id='password_feild' className='form-control' name='password' value={password} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='passowordConfirm_feild'>Confirm Password</label>
                        <input type='password' id='passwordConfirm_feild' className='form-control' name='passwordConfirm' value={passwordConfirm} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phoneNumber_feild'>Phone Number</label>
                        <input type='number' id='phoneNumber_feild' className='form-control' name='phoneNumber' value={phoneNumber} onChange={onChange}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img src={avatarPreview} className='rounded-circle' alt='Avatar Preview'></img>
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input type='file' name='avatar' className='custome-file-input' id='customFile' accept='images/*' onChange={onChange}></input>
                            <label className='custom-file-label' htmlFor='customFile'> Choose Avatar</label>
                        </div>
                    </div>
                    <button id='register_button' type='submit' className='btn btn-block py-3' disabled={loading? true:false}>REGISTER</button>
                </form>
            </div>

        </div>
      
    </>
  )
}

export default Register
