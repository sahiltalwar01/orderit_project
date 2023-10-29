import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'

const UpdateProfile = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [avatar,setAvatar] = useState("")
    const [avatarPreview,setAvatarPreview] = useState("")
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)

    const {error,loading,isUpdated} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)

        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("user updated successfully")
            dispatch(loadUser())
            navigate("/users/me")
            dispatch({
                type:UPDATE_PROFILE_RESET,

            })
        }

    },[dispatch,alert,error,navigate,isUpdated])
    const submitHandler =(e)=>{
        e.preventDefault();

    
        const formData = new FormData();
        formData.set("name",name)
        formData.set("email",email)


        formData.set("avatar",avatar)
        dispatch(updateProfile(formData));
        
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

    }

    return (
        <>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5 updateProfile'>
                <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mb-5 mt-2'> Update Profile</h1>
                        <div className='form-group'>
                            <label htmlFor='name_feild'>Name</label>
                            <input type='text' id='name_feild' className='form-control' name='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' id='email' className='form-control' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
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
                        <button id='register_button' type='submit' className='btn btn-block py-3' disabled={loading? true:false}>UPDATE</button>
                    </form>
                </div>
    
            </div>
          
        </>
      )
}

export default UpdateProfile
