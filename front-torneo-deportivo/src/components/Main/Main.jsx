import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { LigaItem } from "../MisLigas/LigaItem/Ligaitem";
import { Misligas } from "../MisLigas/Misligas";
import {NavBar} from '../Navbar/Navbar';
import {Register} from '../Register/Register'
import { UserHome } from "../UserHome/Userhome";
import {LigaList} from '../MisLigas/LigasList/Ligalist'


function Main() {

  const storageToken = localStorage.getItem('token');
  const [token, setToken] = useState((storageToken === null || storageToken === undefined) ? '' : JSON.parse(storageToken));

  return (
  <>
      <NavBar token={token} setToken={setToken} >
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/login" element={<Login  setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/bienvenido" element={<UserHome token={token}  />} />
        <Route path="/mis-ligas" element={<Misligas token={token} />} />
      </Routes>
      </NavBar>
  </>
  )
}
export {Main};
