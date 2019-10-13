import React from 'react';

//item, value: props passed into CartItem in Cartlist
export default function CartItem({item, value}) {
    //destructuring and getting respective items needed from item and value
    const {id, title, img, price, total, count} = item;
    const {increment, decrement, removeItem} = value

    return (
        <div> 
            {/* displaying cart object and its respective properties */}
            <div className="row my-3 text-capitalize text-center">
                <div className="col-10 mx-auto col-lg-2">
                    <img src={img} style={{width: '5rem', height: '5rem'}} alt="product" className="container-fluid"/>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">product: </span>{title}
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">price: </span>{price}
                </div>

                {/* increment n decrement buttons */}
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <span className="btn btn-black mx-1" onClick={() => decrement(id)}>-</span>
                    

                    <span className="btn btn-black mx-1">{count}</span>


                   
                        <span className="btn btn-black mx-1" onClick={() => increment(id)}>+</span>
                    </div>
                </div>
                {/* end of increment n decrement buttons */}

                <div className="col-10 mx-auto col-lg-2">
                    <div className="cart-icon" onClick={() => removeItem(id)}>
                        <i className="fas fa-trash"></i>
                    </div>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <strong >item total: $ {total}</strong>
                </div>
                
            </div>
        </div>
    )
    
}