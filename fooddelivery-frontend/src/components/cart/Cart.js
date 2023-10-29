import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {  removeItemFromCart, updateCartQuantity } from '../../actions/cartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector((state)=>state.cart);
    const removeCartItemsHandler = (id)=>{
        dispatch(removeItemFromCart(id))
    }
    const increaseQty = ((id,quantity,stock)=>{
        if(quantity>stock) return;
        const newQty  = quantity+1;
        dispatch(updateCartQuantity(id,newQty))
    })
    const decreseQty = ((id,quantity)=>{
        if(quantity>1){
            const newQty = quantity -1;
            dispatch(updateCartQuantity(id,newQty))
        }
    })
    const checkoutHandler = ()=>{
        navigate("/delivery")
    }
    // const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    
  return (
    <>
     {
        cartItems.length ===0 ?(
            <h2>Your cart is empty</h2>
        ):(
            <>

            <h2 className='mt-5'>Your cart: <b>{cartItems.reduce((total, item) => total + item.quantity, 0)} items</b></h2>
            <div className='row d-flex justify-content-between  cart'>
                <div className='col-12 col-lg-8'>
                    {cartItems.map((item)=>(
                        <>
                            <hr/>
                            <div className='cart-item' key={item.fooditem}>
                            <div className='row'>
                            <div className='col-4 col-lg-3'>
                            <img src={item.image} alt='item' height='90' width='115'></img>
                            </div>
                            <div className='col-5 col-lg-3'>{item.name}</div>
                            <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                                <p id='card_item_price'>
                                    <FontAwesomeIcon icon ={faIndianRupee} size='xs'/>
                                    {item.price}


                                </p>
                            </div>
                            <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                                <div className='stockCounter d-inline'>
                                    <span className='btn btn-danger minus' onClick={()=>decreseQty(item.fooditem,item.quantity)}>-</span>
                                    <input type='number' className='form-control count d-inline' value={item.quantity} readOnly />
                                    <span className='btn btn-primary plus' onClick={()=>increaseQty(item.fooditem,item.quantity,item.stock)} >+</span>
                                </div>
                            </div>
                            <div className='col-4 col-lg-1 mt-4 mt-lg-0'>
                                <i id='delete_cart_item' className='fa fa-trash btn btn-danger' onClick={()=>removeCartItemsHandler(item.fooditem)}>


                                </i>
                            </div>
                            </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className='col-12 col-lg-3 my-4'>
                    <div id='order_summary'>
                        <h4>Order Summary</h4>
                        <hr/>
                        <p> Subtotal: 
                            <span className='order-summary-values'>
                                {cartItems.reduce((acc,item)=>acc+Number(item.quantity),0)}
                                (Units)
                            </span>


                        </p>
                        <p>
                            Total:
                            <span className='order-summary-values'>
                                <FontAwesomeIcon icon={faIndianRupee} size='xs'/>
                                {cartItems.reduce((acc,item)=>acc + item.quantity * item.price,0).toFixed(2)}
                            </span>

                        </p>
                        <hr/>
                        <button id='checkout_btn' className='btn btn-primary btn-black' onClick={checkoutHandler} > Checkout</button>
                    </div>
                </div>
            </div>
            </>
        )
     } 
    </>
  )
}

export default Cart
