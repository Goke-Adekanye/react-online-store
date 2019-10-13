import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
//styled components
import styled from 'styled-components';
import {ButtonContainer} from './Button';


export default class Navbar extends Component {
    render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
               {/* Including the logo-svg(which also has a Link-attr) in the navbar */}
               {/*  https://www.iconfinder.com/icons/1243689/call_phone_icon
                    Creative Commons (Attribution 3.0 Unported);
                    https://www.iconfinder.com/Makoto_msk  */}
               
                <Link to="/" >
                    <img 
                        src={logo} 
                        alt="store" 
                        className="navbar-brand nav-text" 
                    />
                </Link>
                {/* un-ordered list in the navbar */}
                <ul className="navbar-nav align-items-center">
                    <li className="nav-items ml-5">
                        <Link to="/" className="nav-link nav-text"> products </Link>
                    </li>
                </ul>
                {/* cart-button(serves as link to the cart) in the navbar */}
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                       <span className="mr-2"> <i className="fas fa-cart-plus" aria-hidden="true"></i> </span>
                        cart 
                    </ButtonContainer> 
                </Link>


           </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;

    }



`

