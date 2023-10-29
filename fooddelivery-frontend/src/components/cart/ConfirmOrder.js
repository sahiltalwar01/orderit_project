import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckOutStep from './CheckOutStep'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

const ConfirmOrder = () => {
    const {cartItems,deliveryInfo} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const itemPrice = cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const deliveryPrice = itemPrice>200?0:25
    const taxPrice = Number((0.05*itemPrice).toFixed(2))
    const finalPrice = (itemPrice+deliveryPrice+taxPrice).toFixed(2)
    console.log(cartItems)

    const processToPayment = ()=>{
        const data = {
            itemPrice:itemPrice.toFixed(2),
            deliveryPrice,
            taxPrice,
            finalPrice,

        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data))
        navigate("/payment")

    }

  return (
    <>
        <CheckOutStep delivery confirmOrder/>
        <div className='row d-flex justify-content-between'>
            <div className='col-12 col-lg-8 mt-5 order-confirm cartt'>
                <h4 className='mb-3 '>Delivery Info
                    <p>
                        <b>Name:</b>{user && user.name}
                    </p>
                    <p>
                        <b>
                            Phone: 
                        </b>
                        {deliveryInfo.phoneNo}
                    </p>
                    <p className='mb-4'>
                        <b>Address:</b>
                        {`${deliveryInfo.address},${deliveryInfo.city},${deliveryInfo.postalCode},${deliveryInfo.country}`}
                    </p>
                    </h4>
                    <hr/>
                    <h4 className='mt-4'> Your Cart Items:</h4>
                    {
                        cartItems.map((item)=>(
                           
                            <Fragment key={item.fooditem}>
                                <hr/>
                                <div className='row'>
                                    <div className='col-4 col-lg-2'>
                                        <img src={item.image} alt='Item' height='100' width='105'></img>
                                    </div>
                                    <div className='col-5 col-lg-6'>{item.name}</div>
                                    <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                                        <p>
                                            {item.quantity} X <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                                            {item.price}=
                                            <b>
                                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                                                {(item.quantity * item.price).toFixed(2)}
                                            </b>

                                        </p>

                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }

            </div>
            <div className='col-12 col-lg-3 my-5 cartt'>
                <div id='order_summary'>
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>
                        Subtotal:
                        <span className='order-summary-values'>
                            <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                            {itemPrice}
                        </span>
                    </p>
                    <p>
                        Tax:
                        <span className='order-summary-values'>
                            <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                            {taxPrice}
                        </span>
                    </p>
                    <p>
                        Toatal:
                        <span className='order-summary-values'>
                            <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/>
                            {finalPrice}
                        </span>
                    </p>
                    <hr/>
                    <button id='checkout_btn' className='btn btn-primary btn-block' onClick={processToPayment}>
                        Process To Payment
                    </button>
                   
                </div>
            </div>
        </div>

    </>
  )
}

export default ConfirmOrder
