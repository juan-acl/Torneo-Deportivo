import React, { useState } from "react";
import {url} from '../../api';
import axios from 'axios';
import Swal from "sweetalert2";
import { LigaList } from "./LigasList/Ligalist";



function Misligas({token}) {
  
  const headers = {
    headers: {
      Authorization: token
    }
  }
  const [liga, setLiga] = useState({
    name: '',
  });

  const changeRegisterLiga = (e) => {
    const {name, value} = e.target;
    setLiga({
      ...liga,
      [name]: value,
    });
  };


  const submitAddLiga = async(e) => {
    try{
      e.preventDefault();
      const res= await axios.post(url + 'league/addLeague', liga, 
        {headers: {
          Authorization: token
        }}
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: res.data.message,
        timer: 2000,
        toast: true
      })
      console.log('liga agregada')
      e.target.reset();
    }catch(err) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        color: 'white',
        background: 'rgba(0,0,0,0.9)',
        title: err.response.data.message,
        timer: 2000,
        toast: true
      })
    }
    
  }

  return (
    <>

   <form onSubmit={submitAddLiga} >  
  <div style={{marginTop: 50}} class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Ligas</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <label> Nombre de la liga </label>
              <input type='text' placeholder="Nombre de la liga" name="name" onChange={changeRegisterLiga} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={submitAddLiga} className="btn-primary" data-dismiss="modal" >Save changes</button>
      </div>
    </div>
  </div>
</div>
</form>

  <button style={{marginTop: -600}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Crear ligas
</button>
<LigaList token={token} />
</>
  )
}


export {Misligas};
