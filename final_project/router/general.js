const axios = require('axios');
const express = require('express');
let books = require("./booksdb.js");

const public_users = express.Router();

// ================= TASK 1 =================
// Get all books
public_users.get('/', function (req, res) {
    return res.send(JSON.stringify(books, null, 4));
});

// ================= TASK 2 =================
// Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn], null, 4));
});

// ================= TASK 3 =================
// Get books by author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();

    const result = Object.values(books).filter(book =>
        book.author.toLowerCase().includes(author)
    );

    return res.send(JSON.stringify(result, null, 4));
});

// ================= TASK 4 =================
// Get books by title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();

    const result = Object.values(books).filter(book =>
        book.title.toLowerCase().includes(title)
    );

    return res.send(JSON.stringify(result, null, 4));
});

// ================= TASK 5 =================
// Get book reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
});


// =====================================================
// ================= TASK 10 (ASYNC) ====================
// Get all books using async/await + axios
// =====================================================
public_users.get('/async/books', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});


// =====================================================
// ================= TASK 11 (PROMISE) ==================
// Get book by ISBN using promises
// =====================================================
public_users.get('/async/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => res.send(response.data))
        .catch(() => res.status(500).json({ message: "Error fetching ISBN" }));
});


// =====================================================
// ================= TASK 12 (ASYNC) ====================
// Get books by author using async/await
// =====================================================
public_users.get('/async/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching author" });
    }
});


// =====================================================
// ================= TASK 13 (PROMISE) ==================
// Get books by title using promises
// =====================================================
public_users.get('/async/title/:title', (req, res) => {
    const title = req.params.title;

    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => res.send(response.data))
        .catch(() => res.status(500).json({ message: "Error fetching title" }));
});


module.exports.general = public_users;