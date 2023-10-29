import React ,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getMenus } from '../actions/menuAction'
import { useParams } from 'react-router-dom'

import { getRestaurants } from '../actions/restaurantAction'
import Fooditem from './Fooditem'
import { setRestaurantId } from '../actions/cartAction'
const Menu = (storeId) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(setRestaurantId(id));
    const {menus,loaidng,error} = useSelector((state)=>state.menus)
    useEffect(()=>{
        dispatch(getMenus(id));
        dispatch(getRestaurants());
    },[dispatch,id,storeId]);
  return (
    <div>
        {loaidng ?(
            <p>Loading menus...</p>

        ):error ?(
            <p>Error: {error}</p>
        ):
        menus && menus.length >0 ?(
            menus.map((menu)=>(
                <div key={menu._id}>
                    <h2>{menu.category}</h2>
                    <hr/>
                    {menu.items && menu.items.length>0 ? (
                        <div className='row'>
                            {menu.items.map((fooditem)=>(
                                <Fooditem key={fooditem._id} fooditem={fooditem} />
                            ))}
                        </div>
                    ):
                    (
                        <p>No fooditem available</p>
                    )}
                </div>
            ))
        ):(
            <p>No menu available</p>
        )
        }
      
    </div>
  )
}

export default Menu
