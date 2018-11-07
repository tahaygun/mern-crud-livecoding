const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
	title: { type: String },
	msg: { type: String },
	date: {
		type: Date,
		default: new Date().toLocaleString()
	}
});

module.exports = mongoose.model("Message", MessageSchema);
