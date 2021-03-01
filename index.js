require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Connect to database
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée..."));

//Listen on PORT
const server = app.listen(PORT, () => {
	console.log("Server is running on port : " + PORT);
});

//Middleware
app.use(morgan("dev"));
app.use(express.static("./api/public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Give access to clients
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
});

//Routing
const indexRouter = require("./api/routes/public/index");
app.use("/api/v0/", indexRouter);

//Manage errors
app.use((req, res, next) => {
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
			status: err.status,
		},
	});
});

module.exports = app;
