import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import {ProductConsumer} from "../Context"

export default class ProductList extends Component {
    
    render() {
       
        return (

            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                            <Title name="our" title="products"/>

                            <div className="row">
                                <ProductConsumer>
                                    {/* value: provider attr(parameter) which takes the form of an object in the Context.js  */}
                                    {(value) =>{
                                        //loop through array and return the product for every single product in the array
                                        return value.product.map(products => {
                                            //products={products}: mapping content gotten from the API(data.js) onto the the Component <Product/> 
                                            return <Product key={products.id} products={products}/> 
                                        })
                                    }}
                                </ProductConsumer>

                        </div>
                    </div>
                </div>

            </React.Fragment>
            
        )
    }
}

