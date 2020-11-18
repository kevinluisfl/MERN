//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require ('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

//inicia sesion
//api/auth
router.post ('/',
    //console.log('creando usuario...')
   // [
      //  check('email', 'Agrega un email valido').isEmail(),
     //   check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
   // ],
    authController.autenticarUsuario
);

//obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;