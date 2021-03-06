import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, pr) => (total + pr.price*pr.quantity), 0);

    let shippingCost = 0;
    if(totalPrice>100){
        shippingCost = 40;
    }
    else if(totalPrice>500){
        shippingCost = 0;
    }
    else if(totalPrice<=100 && totalPrice>0){
        shippingCost = 50;
    }

    let tax = (totalPrice/10);

    return (
        <div className="displayCart">
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <table>
                <tr>
                    <th>Items: </th>
                    <td>${totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <th>Shipping & Handling: </th>
                    <td>${shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <th>Total before tax: </th>
                    <td>${tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <th>Estimated tax: </th>
                    <td>${totalPrice.toFixed(2)}</td>
                </tr>
                <tr className="totalPrice">
                    <th className="text-primary">Order Total: </th>
                    <td>${(totalPrice + shippingCost + tax).toFixed(2)}</td>
                </tr>
            </table>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;