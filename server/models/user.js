const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		salt: String,
	},
	{
		timestamps: true,
	}
);

// virtual field
userSchema.virtual("password").set(function (password) {
	// create temp variable called _password
	this._password = password;

	// generate a timestamp, uuidv1 gives us the unix timestamp
	this.salt = uuidv1();

	// encrypt the password function call
	this.hashedPassword = this.encryptPassword(password);
});

// methods
userSchema.methods = {
	encryptPassword: function (password) {
		if (!password) return "";

		try {
			return crypto
				.createHmac("sha256", this.salt)
				.update(password)
				.digest("hex");
		} catch (err) {
			return "";
		}
	},
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},
};

module.exports = mongoose.model("User", userSchema);
