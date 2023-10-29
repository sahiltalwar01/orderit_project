import {useStripe, useElements,CardExpiryElement,CardNumberElement,CardCvcElement} from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../reducers/orderReducer';
import { createOrder } from '../../actions/orderAction';
import CheckOutStep from './CheckOutStep';
import axios from 'axios';
import { useAlert } from 'react-alert';

const option = {
    style:{
        base:{
            fontSize:"16px"
        },
        invalid:{
            color:"#9e2146"

        }
    }
}
const Payment  = () => {
    const {cartItems,deliveryInfo,restaurant} = useSelector((state)=>state.cart)
    const {user } = useSelector((state)=>state.auth)
    const alert = useAlert();
    const {error} = useSelector((state)=>state.newOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const element = useElements();
    const stripe = useStripe();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors)
            
        }
    },[dispatch,alert,error])
    const order = {
        orderItems:cartItems,
        deliveryInfo,
        restaurant
    }
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.deliveryPrice = orderInfo.deliveryPrice;
        order.finalPrice = orderInfo.finalPrice
    }
    
    const  paymentData = {
        amount:Math.round(orderInfo.finalTotal*100)
        
    }
    const  submitHandler = async(e)=>{
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;
        
    
        let res;
    try{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        paymentData.description = "Payment for fooditem purchase";
        res = await axios.post("/api/v1/payment/process",paymentData,config)
        const clientSecret = res.data.client_secret;
        if(!stripe ||!element){
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:element.getElement(CardNumberElement),
                name:user.name,
                email:user.email
            }
        });
        if(result.error){
            alert.error(result.error.message)
            document.querySelector("#pay_btn").disabled = false;
        }
        else{
            if(result.paymentIntent.status==="succeeded"){
                order.paymentInfo={
                    id:result.paymentIntent.id,
                    status:result.paymentIntent.status
                }
                dispatch(createOrder(order))
                navigate("/success")
                
            }
            else{
                alert.error("There is some issue")
            }
        }
    }
    catch(error){
        document.querySelector("#pay_btn").disabled = false
        alert.error(error.response.data.message)
    }
    }
  return (
    <>
        <CheckOutStep delivery confirmOrder payment /> 
        <div className='row wrapper'>
            <div className='col-10 col-1g-5'>
                <form className='shadow-lg' onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label htmlFor='card_num_field'> Card Number</label>
                        <CardNumberElement type="text" id="card_num_field" className="form-control" options={option}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='card_exp_field'> Card Expiry</label>
                        <CardExpiryElement type="text" id="card_exp_field" className="form-control" options={option}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='card_cvc_field'> Card CVC</label>
                        <CardCvcElement type="text" id="card_cvc_field" className="form-control" options={option}/>
                    </div>
                    <button id='pay_btn' type='submit' className='btn btn-block py-3'>Pay {`- ${orderInfo && orderInfo.finalPrice}`}</button>
                    
                </form>
            </div>
        </div>
    </>
  )
}

export default Payment
