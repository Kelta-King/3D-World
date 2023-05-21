const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.set("view engine", ejs);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
})