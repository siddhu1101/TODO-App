const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

require("./util/db");

const routes = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(3000, () => {
    console.log("app running on port 3000.")
});