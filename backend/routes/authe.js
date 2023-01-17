const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.send({ message: error.details[0].message });
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.send({ message: "Invalid credentials" });
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid credentials" });

		const token = user.generateAuthToken();
		res.send({ data: token, message: "User logged in" });
	} catch (error) {
		res.send({ message: "Internal error please try again" });
	}
});
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;