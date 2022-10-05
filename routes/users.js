const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/Book");

//CREATE A USER
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET A USER
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL USERS
router.get('/', function(req, res) {
    try {
        User.find({}, function(err, users) {
          var userMap = {};
      
          users.forEach(function(user) {
            userMap[user.name] = user;
          });
          res.status(200).json(userMap);
        });
    } catch (error) {
        console.log(error)        
    }
  });

//BORROW BOOK
router.post("/:id/borrow/:bookId", async (req, res) => {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.params.bookId);
    if (user && book) {
        try {
            if (!user.borrowBooks.includes(req.params.bookId)) {
                user.updateOne({ 
                  $push: { borrowBooks: req.params.bookId },
                  $pull: { returnBooks: req.params.bookId } 
                });
                res.status(200).json("Successfull!");
            } else {
                res.status(403).json("You already borrow this book");
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can't borrow this book");
    }
});

//RETURN BOOK
router.post("/:id/return/:bookId", async (req, res) => {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.params.bookId);
    if (user && book) {
        try {
            if (!user.returnBooks.includes(req.params.bookId)) {
                await user.updateOne({ $pull: { borrowBooks: req.params.bookId } });
                await user.updateOne({ $push: { returnBooks: req.params.bookId } });
                await book.updateOne({ $push: { score: req.body.score } });
                res.status(200).json("Successfull!");
            } else {
                res.status(403).json("You already return this book");
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can't return this book");
    }

});


module.exports = router