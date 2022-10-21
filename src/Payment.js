/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import "./Payment.css"
import CheckoutProduct from "./CheckoutProduct.js"
import {useStateValue} from "./StateProvider.js"
import {Link} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios"
import { useNavigate } from "react-router-dom";
function Payment() {
    const navigate = useNavigate();
    const [{basket,user},dispatch]=useStateValue();
    const stripe = useStripe();
    const elements=useElements();
    const [error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true)
    const[succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setClientSecret]=useState(true)

    useEffect(()=>{
        //what happens here is that when we are ready to make a payment
        //we must first create a connection with stripe
        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                //stripe expects payments in currenceie sub unnit
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
        
    },[basket])

    const handleSubmit = async(event) => {
        //all the stripe stuff goes here 
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.cpnfirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }.then(({paymentIntent})=>{
                //payment is basicall a payment confirmation
                setSucceeded(true);
                setError(null)
                setProcessing(false)
                navigate.replace('orders');
            })
        })
        
    }
    const handleChange = e =>{
        //listen for changes in the card element 
        // displays any error as the customer types the card details 
        setDisabled(e.empty);
        setError(e.error? e.error.message:"");
    }


  return (
    <div className="payment">
    
        <div className="payment__container">
            <h1>
            Checkout (<Link to="/checkout">{basket.length} items</Link>)
            </h1>
            <div className="payment__section">
                 <div className="payment__title">
                    <h3>Delivery Address</h3>
                 </div>
                    <div className="payment__address">
                        <p>{user.email}</p> 
                        <p>Horizon homes </p>
                        <p>Mangalore-575004</p>
                    </div>
                
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    Review Items and delivery
                </div>
                <div className="payment__items">
                    {basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    {/* stripe stuff */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment