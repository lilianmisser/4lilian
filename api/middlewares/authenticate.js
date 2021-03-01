const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers["auth"];
	jwt.verify(token, process.env.JWT_KEY, (err, result) => {
		if (err) {
			res.status(401).json({ error: "Unauthenticated" });
		} else {
			next();
		}
	});
};
