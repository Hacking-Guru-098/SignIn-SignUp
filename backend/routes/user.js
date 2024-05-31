const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

// const signUpSchema = zod.object({
// 	firstName: zod.string().min(2, { message: "Must be valid firstName" }),
// 	lastName: zod.string().min(2, { message: "Must be valid lastName" }),
// 	password: zod
// 		.string()
// 		.min(8, { message: "Password Must be 8 or more characters long" }),
// 			username: zod.string().email().optional(),
// 			phoneNumber: zod.string().optional(),
// });
// const signUpSchema = zod.object({
// 	firstName: zod
// 		.string()
// 		.min(2, { message: "First name must be at least 2 characters long" }),
// 	lastName: zod
// 		.string()
// 		.min(2, { message: "Last name must be at least 2 characters long" }),
// 	password: zod
// 		.string()
// 		.min(8, { message: "Password must be 8 or more characters long" })
// 		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
// 			message:
// 				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
// 		}),
// 	// contact: zod
// 		// .object({
// 			// either email or phoneNumber is required
// 			username: zod.string().email().optional(),
// 			phoneNumber: zod.string().optional(),
// 		// })
// 		// .refine((data) => data.username || data.phoneNumber, {
// 		// 	message: "Either email or phone number is required",
// 		// })
// 		// .refine((data) => !data.username || data.username.includes("@"), {
// 		// 	message: "Invalid email address",
// 		// }),
// });

const signUpSchema = zod.object({
	firstName: zod
		.string()
		.min(2, { message: "First name must be at least 2 characters long" }),
	lastName: zod
		.string()
		.min(2, { message: "Last name must be at least 2 characters long" }),
	password: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		}),
	username: zod.string().email("Invalid email").optional(),
	phoneNumber: zod
		.string()
		.min(10, { message: "Enter correct Mobile number" })
		.optional(),
});

router.post("/signup", async (req, res, next) => {
	const body = req.body;
	const { success, error } = signUpSchema.safeParse(body);

	if (!success) {
		return res.status(400).json({
			message: error.errors[0].message,
		});
	}

	let existingUser;

	if (body.username) {
		existingUser = await User.findOne({ username: body.username });
	} else if (body.phoneNumber) {
		existingUser = await User.findOne({ phoneNumber: body.phoneNumber });
	}

	if (existingUser) {
		return res.status(409).json({
			message: "Username, email or phone number already taken",
		});
	}

	const user = await User.create({
		username: body.username,
		password: body.password,
		firstName: body.firstName,
		lastName: body.lastName,
		phoneNumber: body.phoneNumber,
	});

	const userId = user._id;

	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET
	);

	res.json({
		message: "User created successfully",
		token: token,
	});
});

const signInSchema = zod.object({
	username: zod.union([zod.string().email(), zod.string()]).optional(),

	password: zod
		.string()
		.min(8, { message: "Password must be 8 or more characters long" }),
});

router.post("/signin", async (req, res, next) => {
	const body = req.body;
	const { success } = signInSchema.safeParse(body);

	if (!success) {
		return res.status(400).json({
			message: "Incorrect inputs",
		});
	}
	
	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	
	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		res.json({
			token: token,
		});
		return;
	}

	res.status(401).json({
		message: "Error while logging in",
	});
});

router.get("/api/v1/user");

module.exports = router;

