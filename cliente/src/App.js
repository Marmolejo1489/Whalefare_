import React, { useState, useEffect, useRef, } from 'react'
import Axios from 'axios';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import Sign from './Sign';
import Navbar from './components/Navbarr';
import Navbar2 from './components/Navbarr2';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Feature from './components/Feature';
import Footer from './components/Footer';

import Politicas from './Politicas';
import Terminos from './Terminos';
import Add from './Add';
/*
import Alert from './components/Alert';
*/
import Generador from './Generador';
import { createBrowserHistory } from 'history'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect

} from 'react-router-dom'
import { Nav } from 'reactstrap';
function App() {
    const [nav,setnav] = useState(false);
    const [isLogged, setIsLogged] = useState();

    const check = () => {
        Axios.get('http://localhost:4000/profile').then((response) => {
            if (response.data.loggedIn) {
                setIsLogged(response.data.loggedIn)
            } else {
                setIsLogged(false)
            }
        });
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            check();
            mounted.current = true;
        } else {
            check();
        }
    });


    Axios.defaults.withCredentials = true;
    const changeBackground = () =>{
        if(window.scrollY >= 20){
            setnav(true);
        }else{
            setnav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    return (

        <Router history={createBrowserHistory}>  
           
        <div> <div id="main">
       
         <Switch>
             <Route path="/" exact>
            <div className='main'>
             <Navbar/>
             <div className="container">
                        {//<LoggedRoute path="/landing" Component={Profile} isAuth={isLogged} />
                        }
            </div>
             <div className='name'>
             <h1><span>Almacena</span>, genera y aplica contraseñas</h1>
             <br/>
             <p className='details'>Whalefare te ofrece un entorno seguro para almacenar, generar y aplicar contraseñas.</p>
             <a href="./login" className='cv-btn'>Comienza ya</a>
             </div>
             </div>
             </Route>
             <Route path="/logout">
             <div className='main4'>
                 <Logout />
                 </div>
             </Route>
             <Route path="/footer">
                 <Footer />
             </Route>
             <Route path="/login">
                <div className='main2'>
                 <Navbar/>
                 <Login/>   
                 </div>
             </Route>
             <Route path="/signup">
                 <div className='main3'>
             <Navbar/>
                 <Signup />
                 </div>
             </Route>
             <Route path="/add">
            <div className='main5'>
            <Navbar2/>
            <Add/>
            </div>
             </Route>
             <Route path="/home">
            <div className='main4'>
             <div className="container">
             <Navbar2/>
             <Home/>
                        { 
                            isLogged === true ?
                            <>
                            <Navbar2/>
                            <Home />
                            </>
                                 :
                              
                                <Redirect to={{ pathname: '/' }} />
                        }
                    </div>
                    </div>
             </Route>
             <Route path="/generar">
                 <div className='main'>
             <Navbar2 />
                 <Generador />
                 </div>
             </Route>
             <Route path="/profile">
             <div className='main5'>
                        {
                            isLogged === true ?
                                <>
                                <Navbar2/>
                                <Profile />
                                </>
                                :
                                <Redirect to={{ pathname: '/' }} />
                                
                        }
                       </div>
                </Route> 
                 <Route path="/sign">
                    <Sign />
                </Route>
                <Route path="/terminos">
                    <div className='main4'>
                    <Terminos />
                    </div>
                </Route>
                <Route path="/politicas">
                    <div className='main4'>
                    <Politicas />
                    </div>
                </Route>
                <Route component={NotFound} />
         </Switch>
         </div>
         <Feature></Feature>
         <Footer></Footer>
      </div>
      
     </Router>
     
        
    );
}
/*
return(
        <header>
            <ul>
                <li><a href="/"><b>WHALEFARE</b></a></li>
                <li><a href="github.com" aria-label="Haz clic aquí para iniciar sesión."><b>Iniciar sesión</b></a></li>
                <li><a href="github.com" className="active"
                       aria-label="Haz clic aquí para registrarte."><button><b>Registrarse</b></button></a></li>
            </ul>
        </header>
    );
*/

export default App;