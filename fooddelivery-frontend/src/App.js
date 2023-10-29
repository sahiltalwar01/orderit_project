import './App.css';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Menu from './components/Menu';
import Cart from './components/cart/Cart';
import Delivery from './components/cart/Delivery';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userAction';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import checkOutStep from './components/cart/CheckOutStep';
import ConfirmOrder from './components/cart/ConfirmOrder';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import Payment from './components/cart/Payment';
import axios from 'axios';
import OrderSuccess from './components/cart/OrderSuccess';
function App() {
  const [stripeApiKey,setStripeApiKey] = useState("")
  useEffect(()=>{
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const {data} = await axios.get("/api/v1/stripeapi")
      setStripeApiKey(data.stripeApiKey)


    }
    getStripeApiKey()
  },[])

  return (
    <Router>

    <div className="App">
      <Navbar/>
      <div className='container container-fluid'>
      <Routes>
      <Route path='/' element={<Home/>} exact />
      <Route path='/eats/stores/:id/menus' element={<Menu/>} exact />
      <Route path='/cart' element={<Cart/>} exact />
      <Route path='/delivery' element={<Delivery/>} exact />
      <Route path='/users/login' element={<Login/>} exact />
      <Route path='/users/signup' element={<Register/>} exact />
      <Route path='/users/me' element={<Profile/>} exact />
      <Route path='/users/me/update' element={<UpdateProfile/>} exact />
      <Route path='/confirm' element={<ConfirmOrder/>} exact />
      {
        stripeApiKey && (
          <Route path='/payment' element={<Elements stripe={loadStripe(stripeApiKey)}>

            <Payment/>
          </Elements>
        
        }
          
          >

          </Route>
        )
      }
      <Route path='/success' element={<OrderSuccess/>}></Route>


      
      </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
