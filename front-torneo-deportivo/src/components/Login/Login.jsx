import React, { useState } from "react";
import './Login.css'
import {url} from '../../api'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function Login({setToken}) {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '', password: '' })

const handleChange = (e) => {
    const {id, value} = e.target;
    setUser({
      ...user,
      [id]: value
    })
  }

const onSubmitLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(url + 'user/login', user)
      Swal.fire({
        position: 'center',
        icon: 'success',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: response.data.message,
        timer: 2000,
        toast: true,
      })
      localStorage.setItem('token', JSON.stringify(response.data.token))
      setToken(response.data.token)
      e.target.reset();
      navigate('/bienvenido')
    }catch(err) {
        Swal.fire({
        position: 'center',
        icon: 'warning',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: err.response.data.message,
        timer: 2000,
        toast: true,
      })
    }
  }


  return (
    <>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
      <form onSubmit={onSubmitLogin} >  
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={handleChange} />

        <button type="submit" className="button" >Log In</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>
    </>
  )
}

export {Login};
