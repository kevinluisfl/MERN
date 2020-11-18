//DB_MONGO=mongodb+srv://admin:admin@cluster0.qzlvo.mongodb.net/MERNTASK
//DB_MONGO=mongodb+srv://root:root@cluster0.pmzfj.mongodb.net/merntasks

const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
    //req es peticion, res es respuesta

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer email y password
    const {email, password}= req.body;

    try{
        //revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //tiempo de sesion, una hora en segundos
        }, (error, token)=>{
            if(error) throw error;

        //Mensaje de confirmacion
        res.json({token});

        });

    } catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
