import React, { Component } from "react";
import axios from "axios";

export default class Message extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: this.props.message,
			isEditModeOn: false,
			messages: [],
			errors: []
		};
	}

	formHandler = event => {
		let formData = this.state.formData;
		formData[event.target.name] = event.target.value;
		this.setState({ formData });
	};
	submitHandler = e => {
		e.preventDefault();
		let { formData } = this.state;
		axios
			.put("http://localhost:3000/message/"+this.state.formData._id, formData)
			.then(res => {
				this.setState(
					{
						isEditModeOn:false,
						errors: [],
						success: "The message posted successfully!"
					},
					this.props.refresh()
				);
			})
			.catch(err => {
				this.setState({ error: err.response, success: null });
			});
	};

	deleteHandler = () => {
		axios.delete(`http://localhost:3000/message/${this.props.message._id}`).then(res => {
			console.log(res);
			this.props.refresh();
		});
	};
	editHandler() {}
	render() {
		let { title, msg } = this.props.message;
		return this.state.isEditModeOn ? (
			<div>
				<form onSubmit={this.submitHandler}>
					<input name="title" value={this.state.formData.title} onChange={this.formHandler} type="text" />
					{title ? <p>{title.msg}</p> : ""}
					<br />
					<br />
					<input name="msg" value={this.state.formData.msg} onChange={this.formHandler} type="text" /> <br />
					{msg ? <p>{msg.msg}</p> : ""}
					<button type="submit">Send</button>
				</form>
			</div>
		) : (
			<div>
				<h2>{title}</h2>

				<p>{msg}</p>
				<button onClick={this.deleteHandler}>Delete</button>
				<button onClick={() => this.setState({ isEditModeOn: true })}>Edit</button>
				<hr />
			</div>
		);
	}
}
