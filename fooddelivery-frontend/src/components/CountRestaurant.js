import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants } from '../actions/restaurantAction'
import "./css/count.css"

const CountRestaurant = () => {
    const dispatch = useDispatch();
    const {count,pureVegRestautantsCount,showVegOnly,loading,error} = useSelector((state)=>state.restaurants)
    useEffect(()=>{
        dispatch(getRestaurants());
    },[dispatch,showVegOnly]);
  return (
    <div>
      { loading ?(
        <p>
            Loading restaurant count...
        </p>
      ):error ?(<p>Error:(error)</p>):
      (
        <p className='NumOfRestro'>
            {showVegOnly ? pureVegRestautantsCount : count}
            <span className='Restro'>
                {showVegOnly ? pureVegRestautantsCount === 1 ? "retaurant":"restaurants":count=== 1 ? "restaurant":"restaurants"}
            </span>
            <hr />
        </p>
      )
      }
    </div>
  );
};

export default CountRestaurant
