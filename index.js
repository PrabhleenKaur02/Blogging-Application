const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require('./routes/user');

const app = express()
const port = 4000;
mongoose.connect('mongodb+srv://kaurprabhleen2002:EGiNeRa7yLhNuZc1@cluster0.ih4d0ql.mongodb.net/LifewithLeenBlog').then(e => console.log('MongoDB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.render("home");
})

app.listen(port, () => console.log(`server is running on port: ${port}`));