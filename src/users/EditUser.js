import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {

    let navigate = useNavigate();

  
    const [user ,setUsers]=useState({
        name:"",
        registrationNo:"",
        mailId:""


    })

    const{name,registrationNo,mailId} =user;

    const onInputChange=(e)=>{
        setUsers({...user,[e.target.name]:e.target.value});


    };  const {id} = useParams();

    useEffect(()=>{

        loadUser();
    },[]);

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:9090/student/update/${id}`,user)
        navigate("/")


    };

    const loadUser = async()=>{
        const result=await axios.get(`http://localhost:9090/student/update/${id}`)
        setUsers(result.data)
    };

  


  return (
    <div className='container'>

      <div className='row'>
         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-3'>Edit User</h2>

        <form onSubmit={(e)=>onSubmit(e)}>
          <div className='mb-3'>
         <label htmlFor='Name' className='form-label'>
            Name
         </label>
         <input type={"text"}
            className="form-control"
            placeholder='Enter your name'
            name="name"
            value={name}
            onChange={(e)=>onInputChange(e)}
         />
         </div>
          <div className='mb-3'>
         <label htmlFor='Name' className='form-label'>
            Registration No
         </label>
         <input type={"number"}
            className="form-control"
            placeholder='Enter your Registration Number'
            name="registrationNo"
            value={registrationNo}
            onChange={(e)=>onInputChange(e)}
         />
         </div>
         
         <div className='mb-3'>
         <label htmlFor='Name' className='form-label'>
            Email-id
         </label>
         <input type={"email"}
            className="form-control"
            placeholder='Enter your email-address'
            name="mailId"
            value={mailId}
            onChange={(e)=>onInputChange(e)}
         />
         </div>
       
         
         <button type='submit' className='btn btn-outline-primary'>Submit</button>
         <Link   className='btn btn-outline-danger mx-2' to={"/"} >Cancel</Link>
         
       
        
 
    </form>

    </div>

    </div>


    </div>
  )
}
