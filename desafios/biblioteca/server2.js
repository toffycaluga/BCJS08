import express from "express";
import router from "./routes/api.js";
import nunjucks from "nunjucks"

const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/axios/dist'));

nunjucks.configure("templates", {
    express: app,
    autoescape: true,
    noCache: false,
    watch: true,

})
app.use('/api', router)



app.listen(3000, () => console.log('servidor ejecutando en puerto 3000'));