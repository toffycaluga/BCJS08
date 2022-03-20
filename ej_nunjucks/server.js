const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();

// se configuran archivos estáticos
app.use("/static", express.static("static"));

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: false,
  watch: true,
});

// Rutas
app.get("/", (req, res) => {
  res.render("index.html", { saludo: "Hola curso!" });
});

// Ejemplo
app.get("/",(req,res)=>{
  const data = {
  saludo: 'hola curso!',
  frutas: ['Sandía', 'Melón', 'Uvas', 'Peras'],
  usuario: {
  nombre: 'John',
  apellido: 'Wick'
  }
  }
  res.render('index.html', data);
 });
