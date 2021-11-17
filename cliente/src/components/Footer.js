function Footer(){
    return(
        <footer>
            <div className="row row-cols-3">
                <div className="container-body">
                    <div className="colum1">
                        <h1>Deberías leer</h1>
                        <div className="row2">
                            <p>Política de privacidad</p>
                            <br/>
                            <p>Términos y condiciones
                                </p>
                            
                        </div>
                    </div>

                    <div className="colum2">
                        <h1>Deberías ver</h1>
                        <div className="row2_ft">
                            <a href="https://github.com/Marmolejo1489/Whalefare"
                               aria-label="Deberías ver el repositorio para entender el proyecto.">
                                <img src="assets/img/GitHub-Mark-Light-120px-plus.png" alt="Logo de GitHub."/>
                            </a>
                        </div>
                    </div>

                    <div className="colum3">
                        <h1>Deberías acudir</h1>
                        <div className="row2">
                            <p>Mar Mediterráneo 227, Popotla, 11400 (Ciudad de México)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                © 2021, Tecnología Krishna, S. A. de C. V. Todos los derechos reservados.
            </div>
        </footer>

    );
}

export default Footer;