import express from "express";
import fs from "fs/promises"
const app = express();
//middlewares
app.use(express.static('static'));
app.use(express.static('node_modules/bootsrap/dist'));
app.use(express.static('node_modules/axios/dist'));


//abrir el archivo  db.json
let db;
async function init() {
    db = await fs.readFile('./db.json', 'utf-8');
    db = JSON.parse(db);

}
init()

function pass_only(req, res, next) {
    if (req.header.pass != '12345')
        console.log(req.headers);
}
//rutas
app.get('/api/citas', async(req, res) => {
    res.json(db.citas)
})
app.get('/bucar/:comuna/:barrio', async(req, res) => {
    console.log('params', req.params);
    console.log('query', req.query);
    console.log('headers', req.header);
    //solo parapost
    console.log('body', req.body);
})

app.listen(3000, () => console.log('conectado en uero 3000'));