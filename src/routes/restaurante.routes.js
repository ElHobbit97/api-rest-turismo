const { Router } = require('express');
const router = Router();

const {
    
} = require('../controllers/restaurante.controller');

router.use('/',(req,res)=>{
    res.send('<h1>Ruta Prueba</h1>');
});

module.exports = router;