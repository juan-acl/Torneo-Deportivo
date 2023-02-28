import React from "react";
import img1 from '../../helpers/450604.webp'
import img2 from '../../helpers/th.webp'
import img3 from '../../helpers/fut.webp'
import {NavBar} from '../Navbar/Navbar'

function Home() {
  
  return (
    <>
      <NavBar />
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img1} className='d-block w-100 h-100 ' alt='img1'/>
    </div>
    <div class="carousel-item">
      <img src={img2} class="d-block w-100 h-100 " alt='img2'/>
    </div>
    <div class="carousel-item">
      <img src={img3} class="d-block w-100 h-100 " alt='img3'/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}

export {Home};
