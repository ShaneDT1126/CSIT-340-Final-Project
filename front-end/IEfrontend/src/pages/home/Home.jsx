import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import MerchDisplay from '../../components/MerchDisplay/MerchDisplay'

const Home = ({setShowItemAdd}) => {

  const[category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/> 
      <MerchDisplay category={category} setShowItemAdd={setShowItemAdd}/>

    </div>
  )
}
export default Home
