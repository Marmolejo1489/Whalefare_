import React, {useState } from 'react';
import iconLista from '../images/lista.png';
import iconTaller from '../images/taller.png';
import iconUsuario from '../images/usuario.png';
import iconLogout from '../images/logout.png';
import{Navbar, Container} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'


function Navbarr2(){

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
            <h1 className='title' style={{ textDecoration: 'none', color:'	#4682B4'}}>WHALEFARE</h1>
             <input type='checkbox' className='menu-btn' id='menu-btn'/>
             <label className='menu-icon' for='menu-btn'>
             <span className='nav-icon'></span>
             </label>    
             <ul className='menu'>
              <NavLink to="/home"><a href='' className='logoo'><img className='logoo' src={iconLista}></img></a></NavLink>
              <NavLink to="/add"><a href='' className='logoo'><img className='logoo' src={iconTaller}></img></a></NavLink>
              <NavLink to="/profile"><a href='' className='logoo'><img className='logoo' src={iconUsuario}></img></a></NavLink>
              <NavLink to="/logout"><a href='' className='logoo'><img className='logoo' src={iconLogout}></img></a></NavLink>
             </ul>
             </Container>
             </Navbar>
             </nav>
            
        )
}

export default Navbarr2;