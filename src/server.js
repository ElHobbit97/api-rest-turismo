const express = require('express');
const UsuarioRouter = require('./routes/usuario.routes');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport'); //Passport
const passportMiddleware = require('./middlewares/passport'); //Passport

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev')); //Modulo de desarrollo para ver las peticiones por la consola del servidor
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize()); //Passport
passport.use(passportMiddleware); //Passport

//Routes
app.use('/api/usuario', UsuarioRouter);
//Descripcion temporal
app.get('/', (req,res)=>{
    res.status(200).send(
        `
        <h1>REST API proyecto turismo SENA</h1>
        <h3>Rutas de acceso la api, (solo estan disponibles mediante el protocolo http)</h3>
        <div>
            <ul>
                <li>
                    <p>
                        ruta para poder registrar usuarios nuevos a al servidor, metodo POST <br>
                        https://api-turismo-nodejs.herokuapp.com/api/usuario/registrar
                    </p>
                </li>
                <li>
                    <p>
                        ruta para poder dar ingreso de usuario al servidor, metodo POST <br>
                        https://api-turismo-nodejs.herokuapp.com/api/usuario/ingresar
                    </p>
                </li>
                <li>
                    <p>
                        ruta para poder obtener la informacion del usuario, metodo GET <br>
                        https://api-turismo-nodejs.herokuapp.com/api/usuario/perfil
                    </p>
                </li>
                <li>
                    <p>
                        ruta para cerrar la sesion del usuario en el servidor, metodo GET <br>
                        https://api-turismo-nodejs.herokuapp.com/api/usuario/cerrar-sesion
                    </p>
                </li>
            </ul>
        </div>
        <h4>Las rutas con el metodo post, retornan tokens de acceso para la informacion privada de cada usuario</h4>
        <h4>Las rutas con el metodo get necesariamente necesitan los tokens de acceso para poder retornar valores privados</h4>
        `
    )
});

//Import server
module.exports = app;