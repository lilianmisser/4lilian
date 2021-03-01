/**
 * POST signup user
 */
exports.signup = (req, res) => {
	const { username, password } = req.body;
	if (username && password && username.length > 2) {


        userModel.register(user)

		res.status(200).json({ message: "c'est bon" });
	} else {
		res
			.status(400)
			.json({ message: "Pas bon, j'ai besoin de : password & username" });
	}
};
