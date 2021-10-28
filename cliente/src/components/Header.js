function Header(){
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
}

export default Header;