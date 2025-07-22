const books = [
    { author: "Chinua Achebe", country: "Nigeria", language: "English", pages: 209, title: "Things Fall Apart", year: 1958 },
    { author: "Hans Christian Andersen", country: "Denmark", language: "Danish", pages: 784, title: "Fairy tales", year: 1836 },
    { author: "Dante Alighieri", country: "Italy", language: "Italian", pages: 928, title: "The Divine Comedy", year: 1315 }
];

const getBooks = (req, res) => {
    res.status(200).json(books);
};

const addBook = (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const { author, country, language, pages, title, year } = req.body;

    if (!author || !country || !language || !pages || !title || !year) {
        return res.status(400).json({ message: 'All fields (author, country, language, pages, title, year) are required' });
    }

    if (typeof pages !== 'number' || pages <= 0) {
        return res.status(400).json({ message: 'Pages must be a positive number' });
    }

    if (typeof year !== 'number' || year <= 0) {
        return res.status(400).json({ message: 'Year must be a positive number' });
    }

    const book = { author, country, language, pages, title, year };
    books.push(book);

    res.status(201).json({ message: 'Book added successfully', book });
};

module.exports = { getBooks, addBook };
