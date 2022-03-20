const express = require('express')
const router = express.Router()
const fs = require('fs').promises


// Abrir el archivo db.json y parsearlo
let db;
async function init() {
    db = await fs.readFile('./db.json', 'utf-8')
    db = JSON.parse(db)
}
init()

// middleware para proteger las rutas de la API
function pass_only(req, res, next) {
    // Si no tiene un pass en sus headers, se le manda un error
    //  y no le permite seguir avanzando
    if (req.headers.pass != '12345') {
        res.status(403)
        return res.send('Usted no tiene acceso')
    }
    next()
}

// Nuestras rutas
router.get('/citas', pass_only, (req, res) => {
    res.json(db.citas)
})

router.get('/regiones', pass_only, (req, res) => {
    res.json(db.regiones)
})

module.exports = router