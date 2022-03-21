import pg from "pg";


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: '1234',
    max: '20',
    min: '2',
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
})

export async function readBooks() {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(`select * from books`)
        client.release();
        // console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
        client.release()
    }
}
export async function insertBook(title, description) {
    const client = await pool.connect();

    try {
        client.query({
            text: "insert into books(title,description) values ($1,$2)",
            values: [title, description],
            name: "insert-of-books"
        });
        client.release();
    } catch (err) {
        console.log(err);
    }
}

export async function readAuthors() {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(`select * from authors`)
        client.release();
        // console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
        client.release()
    }
}
export async function insertAuthors(firstname, lastname, notes) {
    const client = await pool.connect();

    try {
        client.query({
            text: "insert into authors(firstname,lastname,notes) values ($1,$2,$3)",
            values: [firstname, lastname, notes],
            name: "insert-of-authors"
        });
        client.release();
    } catch (err) {
        console.log(err);
    }
}
export async function insertBookAuthor(author_id, book_id) {
    const client = await pool.connect()
    try {
        client.query({
            text: "insert into books_authors(author_id,book_id) values ($1,$2);",
            values: [author_id, book_id],
            name: 'insert-author-book'
        })
    } catch (err) {
        console.log(err);
    }

}

export async function readBookWithId(bookId) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query({
            text: "select * from books where id=$1",
            values: [bookId],
            name: 'select-with-book-id'
        })
        client.release()
            // console.log(rows);
        return rows[0]
    } catch (err) {
        console.log(err);
        client.release()

    }
}


export async function readAuthorWithId(authorId) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query({
            text: "select * from authors where id=$1 ",
            values: [authorId],
            name: 'select-author-with-id'
        })
        client.release()
            // console.log(rows[0]);
        return rows[0]
    } catch (err) {
        console.log(err);
        client.release()

    }
}

export async function searchAuthors(bookId) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query({
            text: `select authors.firstname,authors.lastname from books_authors join authors on(author_id=authors.id) where book_id=$1;`,
            values: [bookId],
            name: 'select-search-authors'
        })
        client.release();
        return rows;
    } catch (err) {
        console.log();
        client.release();
    }
}

export async function searchAuthorsNotbooks(bookId) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query({
            text: `select id,firstname,lastname from books where id not in(select author_id from books_authors where book_id=$1);`,
            values: [bookId],
            name: 'select-search-not-authors'
        })
        client.release();
        return rows;
    } catch (err) {
        console.log();
        client.release();
    }
}





export async function searchBooks(authorId) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query({
            text: `select title from books_authors join books on(book_id=books.id) where author_id=$1;`,
            values: [authorId],
            name: 'select-search-books'
        })
        client.release();
        return rows;
    } catch (err) {
        console.log();
        client.release();
    }
}


export async function searchBooksNotWriteBy(authorId) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query({
            text: ` select id,title from books where id not in(select book_id from books_authors where author_id=$1);`,
            values: [authorId],
            name: 'select-search-not-books'
        })
        client.release();
        return rows;
    } catch (err) {
        console.log();
        client.release();
    }
}