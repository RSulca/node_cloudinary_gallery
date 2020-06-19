const express = require('express') //Framework para generar el servidor
const morgan = require('morgan') //Ver las peticiones http en consola    
const multer = require('multer') //Sube imágenes del formulario al servidor
const path = require('path') //Ayuda en las direcciones
const exphbs = require('express-handlebars') //Motor de plantillas html

//Inicializamos
const app = express()
require('./database')

//Configuracion
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({ storage }).single('image'))

//Routes
app.use(require('./routes'))

module.exports = app;