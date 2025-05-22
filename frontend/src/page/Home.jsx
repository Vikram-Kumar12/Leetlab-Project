import React from 'react'
import Navbar from '../components/Home/Navbar'
import Explore from '../components/Home/Explore'
import Product from '../components/Home/Product'
import Developer from '../components/Home/Developer'
import Hero from '../components/Home/Hero'
import ContactPage from '../components/ReUseAbleCode/ContactPage'
import Features from '../components/Home/Features'


const Home = () => {
  return (
    <div className=''>
      <Navbar/>
      <Hero/>
      <Explore/>
      <Product/>
      <Developer/>
      <Features/>
      <ContactPage/>
    </div>
  )
}

export default Home