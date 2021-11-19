import React, {useState } from 'react';


import{Navbar, Container} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'


function Navbarr(){

    const [nav,setnav] = useState(false);

    const changeBackground = () =>{
        if(window.scrollY >= 20){
            setnav(true);
        }else{
            setnav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);
        return(
            
            <nav  bg="light" expand="lg" className={nav ? 'nav active' : 'nav'}>
            <Navbar>
            <Container>
            <h1 className='title'> <Navbar.Brand href="/" style={{ textDecoration: 'none', color:'	#4682B4'}}>WHALEFARE</Navbar.Brand></h1>
             <input type='checkbox' className='menu-btn' id='menu-btn'/>
             <label className='menu-icon' for='menu-btn'>
             <span className='nav-icon'></span>
             </label>    
             <ul className='menu'>
             <li className='active'><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">Iniciar Sesión</NavLink></li>
             <li> <NavLink style={{ textDecoration: 'none', color:'black'}} to="/signup">Registrar</NavLink></li>
             </ul>
             </Container>
             </Navbar>
             </nav>
            
        )
}

export default Navbarr;