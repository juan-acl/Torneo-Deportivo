import React, { useState } from "react";
import './Register.css'
import {url} from '../../api';
import axios from 'axios'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



function Register () {
  
  const [register, setRegister] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChangeLogin = (e) => {
    const {id, value} = e.target;
    setRegister({
      ...register,
      [id]: value
    })
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post(url + 'user/registerUser', register)
      Swal.fire({
        position: 'center',
        icon: 'success',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: response.data.message,
        timer: 2000,
        toast: true,
        showCancelButton: false,
      })
      e.target.reset();
    }catch(err) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: err.response.data.message,
        toast: true,
        showCancelButton: false,
      })

    }
  }


  return (
  <>
      <div className="container">
  <div className="row justify-content-center">
  <div className="col-md-5">
   <div className="card">
      <div className="card-body py-md-4">
       <form _lpchecked="1" onSubmit={onSubmitLogin} >
          <div className="form-group">
             <input onChange={handleChangeLogin} type="text" className="form-control" id="name" placeholder="Name"/>
        </div>
        <div className="form-group">
             <input onChange={handleChangeLogin} type="text" className="form-control" id="surname" placeholder="Lastname"/>
                            </div>
   <div className="form-group">
     <input onChange={handleChangeLogin} type="text" className="form-control" id="username" placeholder="Username"/>
   </div>
   <div className="form-group">
      <input onChange={handleChangeLogin} type="email" className="form-control" id="email" placeholder="Email"/>
   </div>
   <div className="form-group">
      <input onChange={handleChangeLogin} type="password" className="form-control" id="password" placeholder="Password"/>
   </div>

   <div className="d-flex flex-row align-items-center justify-content-between">
              <Link to='/login'>
                       <button type="button" className="btn btn-primary">Regresar</button>
                    </Link>

                    <button type="submit"  className="btn btn-primary">Create Account</button>
          </div>
       </form>
     </div>
  </div>
</div>
</div>
</div>
  </>
  )
}

export {Register};
