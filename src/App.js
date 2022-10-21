/* eslint-disable no-unused-vars */
import react,{useEffect} from 'react';
import './App.css';
import Header from './Header.js';
import Home from "./Home.js";
import Checkout from "./Checkout.js"
import Login from "./Login.js";
import Payment from "./Payment.js";
import {auth} from "./firebase.js";
import { useStateValue } from './StateProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe('pk_test_51LtP0TSJeqgr3ERcmamqizJKnq4nh6ABue95HOuyIEpFbmeKZ5WjhbGMzzNNeRDmF7zKNhgHz7GOE6xPNKfkCFqD00tVmq1YEu');

function App() {
const[user,dispatch]=useStateValue();
  useEffect(() =>{
    //will only refresh once
    auth.onAuthStateChanged(authUser=>{
      console.log("the user is >>>>",authUser)
      if(authUser){
        //the user just logged in/user was logged in
          dispatch({
            type:'SET_USER',
            user:authUser
          })
      }
      else{
        //user is logged out 
        dispatch({
          type:'SET_USER', 
          user:null
        })
      }
    })

  },[])
  return (
  <Router>
    <div className="app">
     <Routes>

     {/* we are using elements here which is a higher order function */}
      <Route path="/payment" element={[<Header/>,<Elements stripe={promise}><Payment /></Elements>]} />
      <Route path="/login" element={[<Login />]}/>
      <Route path="/checkout" element={[<Header />,<Checkout />] }/>
      <Route path="/" element={[<Header />,<Home/>] }/>
     </Routes> 
    </div>   
  </Router>
    
  );
}

export default App;
