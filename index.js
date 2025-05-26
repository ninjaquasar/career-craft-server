const express = require("express");
const cors = require("cors");
const port = 5100;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Home page response
app.get("/", (req, res) => {
	res.send(
		"<h1 style='text-align: center; font-family: sans-serif;'>🏇🏻 Career is Crafting Tools | Node-Express Server - Career Craft ⚙️</h1>",
	);
});

// Listen to port
app.listen(port, () => {
	console.log(`Career is Crafting Tools on Port ${port}`);
});
