import React, { useEffect, useState } from 'react'

import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart, updateCartQuantity } from '../actions/cartAction'
const Fooditem = (fooditem) => {
    
    const [quantity, setQuantity] = useState(0);
    const [showButtons,setShowButtons] = useState(false);

    const dispatch = useDispatch();
    const alert = useAlert();
    const cartItems = useSelector((state)=>state.cart.cartItems)

    useEffect(()=>{
        const cartItem = cartItems.find((item)=>item.fooditem===fooditem._id)
        if(cartItem){
            setQuantity(cartItem.quantity)
            setShowButtons(true)
        }
    },[cartItems,fooditem])

    const showAddToCartButtons = () =>{
        setShowButtons(true);
    }
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity)=>{
                const newQuantity = prevQuantity -1;
                dispatch(updateCartQuantity(fooditem.fooditem._id,newQuantity));
                return newQuantity;
            });

          
        }
        else{
            setQuantity(0);
            setShowButtons(false);
            dispatch(removeItemFromCart(fooditem.fooditem._id))
        }
      };
    
      const handleIncrease = () => {
        
        if (quantity < fooditem.fooditem.stock) {
          setQuantity((prevQuantity)=>{
            const newQuantity = prevQuantity +1;
            if(newQuantity>0){
                dispatch(updateCartQuantity(fooditem.fooditem._id,newQuantity))
                dispatch(addItemToCart(fooditem.fooditem._id,newQuantity))
                .then(()=>{
                    alert.success("Item added to the cart");
                    setShowButtons(true)
                })
                .catch((error)=>{
                    alert.error("Failed to add item to the cart");
                })
            }
            else{
                alert.error("please select quantity greater than 0");
            }
            return newQuantity
          });
        }
      };
  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
    <div className='card p-3 rounded'>
        <img src={fooditem.fooditem.images[0].url} alt={fooditem.fooditem.name} className='card-img-top mx-auto'></img>

        <div className='card-body d-flex flex-column'>
            <h5 className='card-title'>{fooditem.fooditem.name}</h5>
            <p className='food-desc'>{fooditem.fooditem.description} </p>
            <p className='card-text'>
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {fooditem.fooditem.price}
                <br />
            </p>
            {!showButtons && (
                <button type='button' className='btn btn-primary d-inline ml-4' id='cart_btn' disabled={fooditem.fooditem.stock===0} onClick={showAddToCartButtons}>
                    Add To Cart
                </button>
            )}

            {(showButtons && (
                <div className='stockCounter d-inline'>
                    <span className='btn btn-danger minus' onClick={handleDecrease}>-</span>
                    <input type='number' className='form-control count d-inline' value={quantity} readOnly />
                    <span className='btn btn-primary plus' onClick={handleIncrease}>+</span>
                </div>
            ))}
            <hr />
            <p>
                Status:
                <span id='stock_status' className={fooditem.fooditem.stock >0 ?"greenColor":"redColor"}>
                    {fooditem.fooditem.stock>0 ?"In stock":"Out of Stock"}
                </span>
            </p>
        </div>
    </div>
</div>
  )
}

export default Fooditem
