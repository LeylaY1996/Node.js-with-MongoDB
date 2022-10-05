const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users")
const bookRoute = require("./routes/books")




dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());

app.use("/users", userRoute);
app.use("/books", bookRoute);



app.listen(3000, () => {
    console.log("Backend server is running!!")
})