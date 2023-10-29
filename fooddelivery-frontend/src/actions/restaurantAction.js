import axios from "axios"

import { ALL_RESTAURANT_REQUEST,ALL_RESTAURANT_SUCCESS,ALL_RESTAURANT_FAIL,CLEAR_ERRORS, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant"

export const getRestaurants = ()=> async(dispatch)=>{
    try{
        dispatch({type:ALL_RESTAURANT_REQUEST});
        let link = "/api/v1/eats/stores";
        const {data} = await axios.get(link);
        const {restaurants,count} = data;

        dispatch({
            type:ALL_RESTAURANT_SUCCESS,
            payload:{restaurants,count},
        });
    }catch(error){
        dispatch({
            type:ALL_RESTAURANT_FAIL,
            payload:error.response.data.message,
        });

    }
};


export const sortByRating =() =>{
    return{
        type:SORT_BY_RATINGS
    }
}
export const sortByReviews =() =>{
    return{
        type:SORT_BY_REVIEWS
    }
}
export const toggleVegOnly =() =>(dispatch)=>{
    dispatch({type:TOGGLE_VEG_ONLY});
}
export const clearerrors= ()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,

    });

};