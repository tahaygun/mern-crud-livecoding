const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
	"mongodb://root:root1234@ds155663.mlab.com:55663/livecoding",
	{ useNewUrlParser: true }
);

const { router, TYPES } = require("./router");

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors({ origin: ["http://localhost:3001"], credentials: true }));

app.use(router);

app.get("/", (req, res) => {
	res.json({ x: "Bla" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
