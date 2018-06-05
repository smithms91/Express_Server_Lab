const express = require("express");
const bodyParser = require("body-parser");
const cart = require("./routes/cart");
const app = express();

app.use(bodyParser.json());
app.use("/list", cart);
app.use(express.static(__dirname + "/public"));



let port = 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));


