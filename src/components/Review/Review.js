import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import HappyImage from "../../images/giphy.gif";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const counts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(counts);
    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={HappyImage} alt=""/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map( pd => <ReviewItem removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;