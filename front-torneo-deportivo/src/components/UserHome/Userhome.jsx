import React, { useEffect } from "react";
import img1 from '../../helpers/ligas.webp'
import './Userhome.css'
import {Link} from 'react-router-dom';
import axios from "axios";
import {url} from '../../api'


function UserHome ({token}) {

  const fetchLeagues = async (e) => {
    try{ 
    const response = await axios.get(url+ 'league/getLeagues', {
        headers: {
          Authorization: token
        }
      })
      console.log('esto es una de las ligas',response)
  }catch(err) {
    console.log(err);
  }
  }

  useEffect(() => {
    fetchLeagues();
  }, [])


  return(
  <>
    <article>
      <figure>
          <img src={img1} />
        </figure>
<Link to='/mis-ligas' >
        <a href="#" class="link">
	<svg viewBox='0 0 200 200' width='200' height='200' xmlns='http://www.w3.org/2000/svg' class="link__svg" aria-labelledby="link1-title link1-desc">
		<title id="link1-title">Come quick and click this</title>

		<path id="link-circle" class="link__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />

		<path class="link__arrow" d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"  fill="none" />

		<text class="link__text">
			<textPath href="#link-circle" stroke="none">
				Mis ligas Mis ligas Mis ligas
			</textPath>
		</text>
	</svg>
</a>
</Link>

    </article>
  </>
  )
}

export {UserHome};
