import React,{useEffect, useReducer, useState} from 'react'
import axios from "axios"
import {Link, useParams} from "react-router-dom"
export default function Home() {

    const [users ,setUsers] = useState([])

    const {id} = useParams();

    useEffect(() => {

        loadUsers();

    },[])

    const loadUsers=async()=>{
        const result = await axios.get("http://localhost:9090/student/getall");

        setUsers(result.data);
    }

    const deleteUser= async(id)=>{
        await axios.delete(`http://localhost:9090/student/delete/${id}`)
        loadUsers()

    }


  return (
    <div className='container'>
        <div className='py-4'>

        <table className="table border shadow">

  <thead>
    <tr>
      <th scope="col">Sl No.</th>
      <th scope="col">Name</th>
      <th scope="col">Registration No</th>
      <th scope="col">Mail Id</th>
      <th scope='col'>Action</th>
    </tr>
  </thead>
  <tbody>

  {
    users.map((user,index)=>(
        <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{user.name}</td>
      <td>{user.registrationNo}</td>
      <td>{user.mailId}</td>
      <td>
        <Link className='btn btn-primary mx-2' to={`/view/${user.id}`}>View</Link>


        <Link className='btn btn-outline-primary mx-2'
        to={`/edituser/${user.id}`}
        >Edit</Link>


        <button className='btn btn-danger mx-2' onClick={()=> deleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  


    ))
  }
  
  </tbody>
</table>
        </div>
    </div>
  )
}
