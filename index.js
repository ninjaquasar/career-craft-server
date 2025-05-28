const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv").config;
const port = 5100;
const app = express();
dotenv();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@professorcluster.rlegbqz.mongodb.net/?retryWrites=true&w=majority&appName=ProfessorCluster`;

// Create MongoClient
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

// Database Run Script
async function run() {
	try {
		// Connect client to database server
		await client.connect();
		// Get/Create Database
		const database = client.db("career_craft");
		// Collections
		const jobsCollection = database.collection("jobs");
		// GET: All Jobs
		app.get("/jobs", async (req, res) => {
			const result = await jobsCollection.find().toArray();
			res.send(result);
		});
		// Send ping for successful connection confirmation
		await client.db("admin").command({ ping: 1 });
		console.log("Successfully connected to Database.");
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

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
