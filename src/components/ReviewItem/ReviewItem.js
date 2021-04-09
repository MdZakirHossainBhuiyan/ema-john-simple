import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    
    const reviewItemStyle={
        borderBottom: '1px solid lightgray',
        margin: '5px 20px 5px 20px', 
    }

    const buttonStyle = {
        border: '1px solid black',
        borderRadius: '5px',
        backgroundColor: '#f0c14b',
        width: '200px',
        marginBottom: '10px',
        marginLeft: '40px',
    }

    const tagStyle = {
        marginLeft: '40px',
    }

    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p style={tagStyle}>Quantity: {quantity}</p>
            <p style={tagStyle}><small>Price: {price}$</small></p>
            <br/>
            <button style={buttonStyle} onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;