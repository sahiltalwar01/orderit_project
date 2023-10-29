import { getRestaurants ,sortByRating,sortByReviews,toggleVegOnly } from '../actions/restaurantAction'
import Restaurant from "./Restaurant"
import Loader from "../components/layout/Loader"
import Message from "./layout/Message" 

import {useDispatch, useSelector} from "react-redux"

import React, { useEffect } from 'react'
import CountRestaurant from './CountRestaurant'

const Home = () => {
    const dispatch=useDispatch();
    const {
        loading:restaurantLoading,
        error:restaurantError,
        restaurants,
        showVegOnly

    } = useSelector((state)=>state.restaurants);
    useEffect(()=>{
        if(restaurantError){
            return alert.error(restaurantError);
        }
        dispatch(getRestaurants());
    },[dispatch,restaurantError]);

    const handleSortByReview = () =>{
        dispatch(sortByReviews());
    }
    const handleSortByRating = () =>{
        dispatch(sortByRating())
    }
    const handleToggleVegOnly = () =>{
        dispatch(toggleVegOnly());
    }
  return (
    <>
        <CountRestaurant />
        {restaurantLoading ? (
            <Loader />
        ): restaurantError ? (
            <Message variant="danger">{restaurantError}</Message>
        ): (
            <>
                <section>
                    <div className='sort'>
                        <button className='sort_veg p-3' onClick={handleToggleVegOnly}>{showVegOnly ? "Show ALL ":"Pure Veg"}</button>
                        <button className='sort_rev p-3' onClick={handleSortByReview}>Sort By Reviews</button>
                        <button className='sort_rate p-3' onClick={handleSortByRating}>Sort By Rating</button>

                    </div>
                    <div className='row mt-4'>
                        {restaurants && restaurants.restaurants ? (restaurants.restaurants.map((restaurant)=>
                        !showVegOnly || (showVegOnly && restaurant.isVeg) ?
                        (
                            <Restaurant key={restaurant._id} restaurant={restaurant} />
                        ) : null)
                        ):(
                         <Message variant="info">No Restaurant Found.</Message>   
                        )
                        }

                    </div>
                </section>
            </>
        )
        }
   </>

  );
};

export default Home
