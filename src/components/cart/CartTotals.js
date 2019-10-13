import React from 'react';
import {Link} from 'react-router-dom'

export default function CartTotals({value}) {
    //retrieving datas and method needed from value
    const {cartSubTotal, cartTax, cartTotal, clearCart} = value

    return (
        //JSX to return CartTotal Elements
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        {/* clearCart button */}
                        <Link to="/">
                            <button className="btn btn-outline-danger mb-3 px-5 text-uppercase" 
                                    type="button"
                                    onClick={() => clearCart()}>clear cart</button>
                        </Link>
                        {/* Totals */}
                        <h5>
                            <span className="text-title">subtotal:</span>
                             <strong>$ {cartSubTotal}</strong> 
                        </h5>
                        
                        <h5>
                            <span className="text-title">tax:</span>
                             <strong>$ {cartTax}</strong> 
                        </h5>

                        <h5>
                            <span className="text-title">total:</span>
                             <strong>$ {cartTotal}</strong> 
                        </h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
