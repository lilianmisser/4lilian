/**
 * GET root infos
 */
exports.index = (req, res) => {
	res.status(200).json({ message: "GET root information" });
};
