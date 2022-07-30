require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {json} = require('body-parser');
const app = express();

//Requerir router
const router = require('./routes/index.routes');
const routerUsers = require('./routes/users.routes');
const routerFruits = require('./routes/fruits.routes');
// const routerApi = require('./routes/api.routes');

// Static files
app.use(express.static(__dirname + '/public'))

// Set EJS (view engine)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(json());

//Rutas
app.use('/', router);
app.use('/users', routerUsers);
app.use('/fruits', routerFruits);
// app.use('/api', routerApi);

app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})
  
module.exports = app;