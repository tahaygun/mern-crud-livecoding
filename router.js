const express = require("express");
const router = express.Router();
const Message = require("./models/Message");
const { check, validationResult } = require("express-validator/check");

const TYPES = {
	type1: "type 1",
	type2: "type 2"
};

const messageValidator = [
	check("title")
		.not()
		.isEmpty()
		.withMessage("its empty")
		.isLength({ min: 4 })
		.withMessage("min length is 4"),
	check("msg")
		.not()
		.isEmpty()
		.withMessage("its empty")
		.isLength({ min: 4 })
		.withMessage("min length is 4")
];

router.post("/add-message", messageValidator, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() });
	}

	let message = new Message(req.body);
	message
		.save()
		.then(savedMessage => {
			res.send(savedMessage);
		})
		.catch(err => res.send(err));
});

router.get("/all-messages", (req, res) => {
	Message.find().sort({_id:-1}).then(messages => res.json(messages));
});

router.delete("/message/:id", (req, res) => {
	Message.findByIdAndRemove(req.param("id")).then(deletedMessage => res.json(deletedMessage));
});

router.put("/message/:id", messageValidator, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.mapped() });
	}
	Message.findById(req.param("id")).then(message => {
		message.title = req.body.title;
		message.msg = req.body.msg;
		message.save().then(updatedOne => res.send(updatedOne));
	});
});

router.get("/message/:id", (req, res) => {
	Message.findById(req.param("id")).then(messages => res.json(messages));
});

router.post("/add2", (req, res) => {
	console.log("TCL: body", req.body);
	if (req.body.number) {
		res.send({ number: req.body.number + 2 });
	} else {
		res.send("No number found");
	}
});

router.get("/add/:num/:num2", (req, res) => {
	console.log(req.params);
	res.send({ sum: Number(req.param("num")) + Number(req.param("num2")) });
});

module.exports = { router, TYPES };
