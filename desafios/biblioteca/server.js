import express from "express";
// import router from "./routes/api.js";
import path from "path";
import { insertAuthors, insertBook, insertBookAuthor, readAuthors, readAuthorWithId, readBooks, readBookWithId, searchAuthors, searchAuthorsNotbooks, searchBooks, searchBooksNotWriteBy } from "./db.js";
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

app.post('/books', async(req, res) => {
    console.log(req.body);
    const data = req.body
    await insertBook(data.title, data.description)


    res.status(201).redirect('/')


})

app.get('/books/:book_id', async(req, res) => {
    const bookId = parseInt(req.params.book_id);
    try {
        const book = await readBookWithId(bookId)
        const authors = await searchAuthors(bookId)
        console.log(authors[0]);
        const authorsList = await searchAuthorsNotbooks(bookId);
        console.log(authorsList);
        res.render('book.html', { book, authors, authorsList })

    } catch (err) {
        console.log(err);

    }
})

app.get('/authors/:author_id', async(req, res) => {
    const authorId = parseInt(req.params.author_id);
    // console.log(authorId);
    try {
        const author = await readAuthorWithId(authorId)
        const books = await searchBooks(authorId);
        const booksList = await searchBooksNotWriteBy(authorId);
        // console.log(booksList);
        // console.log(books);
        res.render('author.html', { author, books, booksList })

    } catch (err) {
        console.log(err);
        res.json(err)

    }
})


app.get('/authors', async(req, res) => {
    const authors = await readAuthors()
    res.render('authors.html', { authors })
})
app.post('/authors', async(req, res) => {
    console.log(req.body);
    const data = req.body
    await insertAuthors(data.firstname, data.lastname, data.notes)

    res.status(201).redirect('/authors')
})

app.post('/writeAuthor/:author_id', async(req, res) => {
    const author_id = parseInt(req.params.author_id)
    const book_id = parseInt(req.body.book_id)

    await insertBookAuthor(author_id, book_id)

    res.redirect(`/authors/${author_id}`)
})
app.post('/writeBook/:book_id', async(req, res) => {
        const author_id = req.body.author_id
        const book_id = req.params.book_id
        await insertBookAuthor(author_id, book_id)
        res.redirect(`/books/${book_id}`)
    })
    // app.use('/api', router, )



app.listen(3000, () => console.log('conectado en puerto 3000'))