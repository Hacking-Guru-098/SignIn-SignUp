const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/", {
		dbName: "proj1",
	})
	.then(() => console.log("Connected"))
	.catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
	username: String,

	password: String,

	firstName: String,

	lastName: String,

	phoneNumber: String, 

});

const User = mongoose.model("User", userSchema);

module.exports = {
	User,
};