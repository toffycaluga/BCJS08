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
        console.log(rows);
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
        console.log(rows);
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