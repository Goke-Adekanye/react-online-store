import React from 'react';
import CartItem from './CartItem';

export default function CartList({value}) {
    //getting the cart from the passed in value
    const {cart} = value;
    
    
    return (
        <div>
            {cart.map(item =>{
                //item: passing each cart-product to CartItem
                //value: passing all method-handlers to be used by CartItem into it
                return <CartItem key={item.id} item={item} value={value} />
            }   
            )}
            
        </div>
    )
    
}