import express from "express";
import { insertAuthors, insertBook, insertBookAuthor, readAuthors, readBooks } from "../db.js";
import nunjucks from "nunjucks"
import path from "path";

const router = express.Router();


// function pass_only(req,res,next){
//     if (req.headers.pass != '12345'){
//         res.status(403)
//         return res.send('no poddi pasar y que paza!')
// }
// next();
// }



router.get('/books', async(req, res) => {
    const data = await readBooks()
    console.log(data);
    res.json(data)
})

router.post('/books', async(req, res) => {
    console.log(req.body);
    const data = req.body
    await insertBook(data.title, data.description)


    res.status(201).redirect('/')


})
router.get('/authors', async(req, res) => {
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


export default router;