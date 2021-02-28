import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])

    const handleAddProduct = (product) => {
        console.log('clicked me for ', product.name);
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(productItem => <Product handleAddProduct = {handleAddProduct} product={productItem}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                {/* <h3>Order Summary</h3>
                <p>Items Ordered: {cart.length}</p> */}
            </div>
        </div>
    );
};

export default Shop;