import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(productItem => <Product product={productItem}></Product>)
                }
            </div>
            <div className="cart-container">
                <h3>Order Summary</h3>
            </div>
        </div>
    );
};

export default Shop;