const router = require("express").Router();
const Book = require("../models/Book");

//CREATE A BOOK
router.post("/", async (req, res) => {
    const newBook = new Book(req.body);
    try {
      const savedBook = await newBook.save();
      res.status(200).json(savedBook);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET A Book
router.get("/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/', function(req, res) {
    try {
        Book.find({}, function(err, books) {
          var bookMap = {};
      
          books.forEach(function(book) {
            bookMap[book.name] = book;
          });
          res.status(200).json(bookMap);
        });
    } catch (error) {
        console.log(error)        
    }
  });

module.exports = router