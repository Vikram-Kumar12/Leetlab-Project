import React from 'react'
import Navbar from '../components/Home/Navbar'
import Explore from '../components/Home/Explore'
import Product from '../components/Home/Product'
import Developer from '../components/Home/Developer'
import Hero from '../components/Home/Hero'

const Home = () => {
  return (
    <div className=''>
      <Navbar/>
      <Hero/>
      <Explore/>
      <Product/>
      <Developer/>
    </div>
  )
}

export default Home