import express from "express";
import router from "./routes/api.js";
import path from "path";
import nunjucks from "nunjucks"

const app = express();

app.use(express.static('public'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./node_modules/axios/dist'))
app.use(express.urlencoded({ extended: true }))

nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoescape: true,
    noCache: false,
    watch: true,

})


// app.use('/api', router, )



app.listen(3000, () => console.log('conectado en puerto 3000'))