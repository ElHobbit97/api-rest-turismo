const { Router } = require('express');
const router = Router();

const {
    
} = require('../controllers/actividad.controller');

router.use('/',(req,res)=>{
    res.send('<h1>Ruta Prueba</h1>');
});

module.exports = router;