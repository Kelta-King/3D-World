const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.end("Yoman");
})

app.listen(3000, () => {
    console.log("Server started on 3000");
})