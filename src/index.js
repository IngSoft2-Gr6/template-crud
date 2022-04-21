const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

// Exception handlers
process.on("uncaughtException", (error) => {
	console.error("Uncaught exception: ", error);
	process.exit(1); // exit application
});

process.on("unhandledRejection", (error, promise) => {
	console.error("Unhandled promise: ", promise);
	console.error("The error was: ", error);
});

// middleware(s)
app.use(cors("*"));

// Support JSON-encoded bodies.
app.use(express.json());
// Support URL-encoded bodies.
app.use(
	express.urlencoded({
		extended: false,
	})
);

// routes
app.use("/api/v1", require("./routes/index"));

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = app;
