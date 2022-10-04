const router = require("express").Router();
const User = require("../models/User");

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

module.exports = router