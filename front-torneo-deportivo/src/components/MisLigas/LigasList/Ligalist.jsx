import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../../api";
import { LigaItem } from "../LigaItem/Ligaitem";


function LigaList ({token}) {
    const [ligas, setLigas] = useState([]);
    
    const fetchLigas = async () => {
    try{
    const res = await axios.get(url + 'league/getLeagues', 
        {headers: {
          Authorization: token
        }})
      setLigas(res.data.leagues)
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
  fetchLigas()
  }, [])

  return(
  <>
       {!ligas.length && <h1 style={{marginTop: -1000}} >Crea tu primera liga!!!</h1> }

      <div className="container" style={{marginTop: 0}} >
        <div className="row">
                   {ligas.map((item, index) => {
            return (
              <div className="col-md-3" key={index} >
              <LigaItem item={item} />
              </div>
            )
          })}
        </div>

      </div>
  </>
  )
}

export {LigaList};
