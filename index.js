const path = require("path");
const express = require("express");

const app = express()
const port = 4000;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get('/', (req, res) => {
    res.render("home");
})

app.listen(port, () => console.log(`server is running on port: ${port}`));