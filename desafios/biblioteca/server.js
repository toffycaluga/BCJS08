import express from "express";
import router from "./routes/api.js";
import path from "path";
import { insertAuthors, insertBook, insertBookAuthor, readAuthors, readBooks } from "./db.js";
import nunjucks from "nunjucks"

const app = express();

// app.use(express.static('public'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./node_modules/axios/dist'))
app.use(express.urlencoded({ extended: true }))

// console.log(__dirname);

nunjucks.configure(path.resolve("templates"), {
    express: app,
    autoescape: true,
    noCache: false,
    watch: true,

})


app.get('/', async(req, res) => {
    const books = await readBooks()
    console.log(books);
    res.render("index.html", { books })
})

app.post('/api/books', async(req, res) => {
    console.log(req.body);
    const data = req.body
    await insertBook(data.title, data.description)


    res.status(201).redirect('/')


})
app.get('/authors', async(req, res) => {
    const authors = await readAuthors()
    res.render('authors.html', { authors })
})
router.post('/authors', async(req, res) => {
    console.log(req.body);
    const data = req.body
    await insertAuthors(data.firstname, data.lastname, data.notes)

    // const data=req.body;
    res.status(201).redirect('/authors.html')
})

router.post('/escribir/:book_id/:author_id', async(req, res) => {
        const datos = req.params
        await insertBookAuthor(datos.author_id, datos.book_id)

        res.json({ todo: 'ok' })
    })
    // app.use('/api', router, )



app.listen(3000, () => console.log('conectado en puerto 3000'))