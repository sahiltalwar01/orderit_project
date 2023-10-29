import { ALL_RESTAURANT_FAIL,ALL_RESTAURANT_REQUEST,ALL_RESTAURANT_SUCCESS,CLEAR_ERRORS, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant";

const initialstate = {
    restaurants:[],

};
export const restaurantReducer = (state = initialstate,action)=>{

    switch(action.type){
        case ALL_RESTAURANT_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case ALL_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                count:action.payload.count,
                restaurants: action.payload,
            };
        case ALL_RESTAURANT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            };
        case TOGGLE_VEG_ONLY:
            return  {
                ...state,
                showVegOnly: !state.showVegOnly,
                pureVegRestautantsCount: calculatePureVegCount(state.restaurants.restaurants,!state.showVegOnly) ,
                

            };      
        case SORT_BY_RATINGS:
            return  {
                ...state,
                restaurants:{
                    ...state.restaurants,
                    restaurants:[...state.restaurants.restaurants].sort((a,b)=>b.ratings-a.ratings),
                },

            };      
        case SORT_BY_REVIEWS:
            return  {
                ...state,
                restaurants:{
                    ...state.restaurants,
                    restaurants:[...state.restaurants.restaurants].sort((a,b)=>b.numOfReviews-a.numOfReviews),
                },

            };      
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,

            }; 

        default:
            return state;          
    }
}

const calculatePureVegCount = (restaurants,showVegOnly)=>{
    if(!showVegOnly){
        return restaurants.length;
    }
    else{
        return restaurants.filter((restaurant)=>restaurant.isVeg).length;
    }
}