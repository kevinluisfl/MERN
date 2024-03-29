const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

//actualizar una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

//eliminar una tarea, cambiar el :
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;