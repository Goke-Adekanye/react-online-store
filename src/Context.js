import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

//CONTEXT API 
const ProductContext = React.createContext()
//whenever a context object is created, it comes with two components:
//-Provider
//--Consumer

class ProductProvider extends Component {
    //initializing states for the data received from data.js
    state = {
        //setting product to empty array
        product: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
    componentDidMount() {
        this.setProduct()
    }

    //setProduct: method that make copy of data-array gotten from the API(storeProducts)
    //--So we can manipulate the copy-data and not tampering with the original-data
    setProduct = () => {
        let tempProduct = []
        //loop thru all data-array(storeProducts) in which each array is an Oject
        //forEach: function specifying each array-object in the data-array
        storeProducts.forEach(item => {
            //...item: copying the values from each-single-array-object and assigning it to our new singleItem 
            const singleItem = {...item}
            //grabbing the  old-values of the product-array(empty) and adding the singleItem to it
           tempProduct = [...tempProduct, singleItem]
            
        })
        //after the looping 
        this.setState(() => {
            return {product: tempProduct}
        })
    }

    //getItem: utility method that gets the item according to id-passed in
    getItem = (id) => {
        //find(): if id of item-found matches id of we passing in(that is: item-clicked), return item-found 
        const singleProduct = this.state.product.find(item => item.id === id);
        return singleProduct;
    }

    //handleDetail: method that handles click-event leading to product-detail-page
    handleDetail = (id) => {
       //getting the utility method getItem into our handleDetail()
       const singleProduct = this.getItem(id);
       //setting new state for detailProduct when click-function-handleDetail() is triggered
       this.setState(() =>{
           //returning singleProduct as new state for detailProduct
           //--that is flipping the id of item gotten from method-getItem with detailProduct
               return {detailProduct: singleProduct}
       })
    }

    //addToCart: method that handles click-event add-to-cart
    addToCart = (id) => {
        //tempProduct: temporary variable acquiring the this.state.product[] attributes
        let tempProduct = [...this.state.product]
        //indexOf(getItem()): returns the index of the first occurence of id-passed-in using the this.getItem()-method(which finds the single=object from the product-array)  
        //--in the tempProduct(that is, finding the product-object we are looking for)
        const index = tempProduct.indexOf(this.getItem(id))
        //product: gets the tempProduct with a specific object(that is, a specific product-item that match id-passed-in from the array)
        const product = tempProduct[index]
                //change the property of inCart on this object
                product.inCart = true
                //change the property of count on this object
                product.count = 1
                //change the property of total on this object
                const price = product.price
                    product.total = price

        //setting the inCart-proerty after clicking the add-to-cart button
        this.setState(() => {
                return {product: tempProduct,
                        cart: [...this.state.cart, product]}
        }, ()=>{this.addTotals()
        })

    }

//--------------------------- Modal Methods ----------------------------------

    //openModal: method to open the model-page when the cart-button is clicked
    openModal = id => {
        //getting the particular item with corresponding id passed-in
        const product = this.getItem(id)
        //setting state modalProduct to current product
        this.setState(() => {
            return {modalProduct: product,
                    modalOpen: true 

            }
        })
    }

    //closeModel: method to close model-page
    closeModal = () => {
        //setting the modalOpen to false
        this.setState(() => {
            return {modalOpen: false}
        })
    }
//--------------------------- Cart Methods ----------------------------------
increment = (id) => {
    let tempCart = [...this.state.cart];
    //getting the specific product selected thru the id passed-in
    const selectedProduct = tempCart.find(item=>item.id === id);

    //index: from the tempCart, get the indexOf selected item
    const index = tempCart.indexOf(selectedProduct);
    //set const product = the selcted item
    const product = tempCart[index];
    //increment properties of selected-product(item)
    product.count = product.count + 1;
    product.total = product.count * product.price;
    
    //return ...tempCart(temporaryCart with changes to properties of item selected thru id)
    this.setState(
      ()=> {
        return {cart: [...tempCart]};
      },
      ()=> {
        //addTotal: method runs thru cart once again and set all values for items remaining in cart
        this.addTotals();
      }
    );
    
}

decrement = (id) => {
    let tempCart = [...this.state.cart];
    //getting the specific product selected thru the id passed-in
    const selectedProduct = tempCart.find(item=>item.id === id);

    //index: from the tempCart, get the indexOf selected item
    const index = tempCart.indexOf(selectedProduct);
    //set const product = the selcted item
    const product = tempCart[index];
    //decrement properties of selected-product(item)
    product.count = product.count - 1;

    //conditioner rendering to automatically remove item from cart when count is set to Zero
    if(product.count === 0) {
        this.removeItem(id)
    }
    else {
    product.total = product.count * product.price;
    
    //return ...tempCart(temporaryCart with changes to properties of item selected thru id)
    this.setState(
      ()=> {
        return {cart: [...tempCart]};
      },
      ()=> {
        //addTotal: method runs thru cart once again and set all values for items remaining in cart
        this.addTotals();
      }
    );
    }
}

//removeItem: method that remove single item from the cart
removeItem = (id) => {
    //temporary-arrays for getting the product and cart from the state
    let tempProducts = [...this.state.product];
    let tempCart = [...this.state.cart];

    //filter: return only the items that donot match this id in the cart
    //--that is, remove the id-selected and return the rest of the cart
    tempCart = tempCart.filter(item => item.id!==id);

    //index: get the selected item with id passed-in(plus also know its index) from the array-of-items
    const index = tempProducts.indexOf(this.getItem(id));

    //removedProduct: getting the particular object from the product-array
    //--setting the object-props to default
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    //setting cart: [...tempCart] that is, cart containing all other cart-items apart from the id selected
    this.setState(()=>{
      return {
        cart: [...tempCart],
        product: [...tempProducts]
      }
    }, ()=>{
     //addTotal: method runs thru cart once again and set all values for items remaining in cart
      this.addTotals();
    })
  }

//clearCart: method that clears the cart and set it to empty
clearCart = () => {
    //set cart to empty
    this.setState(()=>{
      return {cart:[]};
    }, ()=>{
      //setProduct: callback functionality that return all products to their initial state
      this.setProduct();
      //addTotal: method runs thru empty cart and set all values to zero
      this.addTotals(); 
    })
  }

//addTotals: function to maths operations on object-properties in cart
addTotals = () => {
    let subTotal = 0;
    //return for each item(object) inCart (subTotal += each item-total)
    this.state.cart.map(item => (subTotal += item.total));
    //calculating the tax ratio
    //tempTax: subTotal * tax-percentage 
    const tempTax= subTotal * 0.1;
        //parseFloat: converting Temptax(tax-ratio-float) to 2-significant-fig 
        const tax = parseFloat(tempTax.toFixed(2));
    //calculating the total
    const total = subTotal + tax;
    //return states for cart-props
    this.setState(()=>{
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      }
    })
}

    render() {
        return (
            //-Provider
            //value: attr of the Provider thats being called-on by the Consumer in the the ProductList.js
            //--value can also take the form of an object:
            //---object which consist of API-states(products from data.js) and other handle-methods
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {/* returning all children that are going to be in the application */}
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//--Consumer
const ProductConsumer = ProductContext.Consumer;


export {ProductProvider, ProductConsumer} 