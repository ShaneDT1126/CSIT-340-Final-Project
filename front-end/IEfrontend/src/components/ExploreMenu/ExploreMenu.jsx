import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore</h1>
        {/* <p className='explore-menu-text'>I done did a lot uh thangs in mah day. I admit it ah don take back what I say. If ah said it then I meant it all mah life i want a Grammy but I prolly nevuh get it. I aint never had a trophy or no mothu fucking ribbon Fuck the system IM that nigga bend the law cut the rules Im about tuh risk it all i aint got nothing to lose yall been eating long enough its my turn to cut hte food pass the plate this mah day lucky you FUCK YOU TOO WOOOOO</p> */}
        <div className="explore-menu-list">
            {menu_list.map((item,index)=> {
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
