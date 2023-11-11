import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice';




export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector ((state) =>state.user)
  const [file, setFile] = useState(undefined);
  const [filePerce, setFilePerce] = useState(0);
  const [fileUplodeError, setFileUplodeError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  
  // firebase storage 
  // allows read;
  //all write: if 
  // request.resource.size < 2 * 1024 *1024 && 
  // request.resource.contentType.matches('image/.*')

useEffect (() => {
  if(file) {
    handleFileUplode(file);
  }
}, [file]);

const handleFileUplode = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef= ref(storage, fileName);
  const uplodeTask = uploadBytesResumable(storageRef, file);


  uplodeTask.on('state_changed',
  (snapshot) => {
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    setFilePerce(Math.round(progress));
  });
  () => {
    getDownloadURL(uplodeTask.snapshot.ref).then
    ((downloadURL) =>{
      setFormData({...formData, avatar: downloadURL});
    });
};
};

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
};
  const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
     if(data.success === false){
      dispatch(updateUserFailure(error.message));
      return;
     }

     dispatch(updateUserSuccess(data.success)); 
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input 
        onChange={(e) => setFile(e.target.files[0])}
        type="file" 
        ref={fileRef} 
        hidden 
        accept='image/*'
        />

        <img onClick={ () => fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUplodeError ? (
            <span className='text-red-700'>Error Image
             Uplode (Image must be less than 2 mb)</span>
          ): filePerce > 0 && filePerce < 100 ? (
            <span className='text-slate-700'>{`Uploading $
            {filePerce}%`}</span> 
          ) : filePerce === 100 ? (
            <span className='text-green-700'>
              Image Uplode Successfully</span>
          ) : (
            ''
        )}
        </p>
        <input type="text" 
        placeholder='username' 
        defaultValue={currentUser.username}
        id='username' 
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />
        
        <input type="email" 
        placeholder='email' 
        defaultValue={currentUser.email}
        id='email' 
        className='border p-3 rounded-lg' 
        onChange={handleChange}
        />

        <input type="password" 
        placeholder='password' 
        id='password' 
        className='border p-3 rounded-lg' />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 '>
          {loading ? 'loading...': 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
