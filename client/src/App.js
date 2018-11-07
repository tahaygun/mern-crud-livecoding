import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Message from "./Message";
axios.defaults.withCredentials = true;
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				title: "",
				msg: ""
			},
			messages: [],
			errors: []
		};
	}
	componentDidMount() {
		this.fetchAllMessages();
	}

	fetchAllMessages = () => {
		axios.get("http://localhost:3000/all-messages").then(messages => this.setState({ messages: messages.data }));
	};

	formHandler = event => {
		let formData = this.state.formData;
		formData[event.target.name] = event.target.value;
		this.setState({formData});
	};
	submitHandler = e => {
		e.preventDefault();
		let { formData } = this.state;
		axios
			.post("http://localhost:3000/add-message", formData)
			.then(res => {
				this.setState(
					{
						formData: {
							title: "",
							msg: ""
						},
						errors: [],
						success: "The message posted successfully!"
					},
					this.fetchAllMessages()
				);
			})
			.catch(err => {
				console.log("TCL: App -> ...err.response.data", err.response.data);
				this.setState({ ...err.response.data, success: null });
			});
	};
	render() {
		let { title, msg } = this.state.errors;
		return (
			<div className="App">
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
					{this.state.success ? <p>{this.state.success}</p> : ""}
				</div>
				<div>
					{this.state.messages.map(message => (
						<Message refresh={this.fetchAllMessages} message={message} />
					))}
				</div>
			</div>
		);
	}
}

export default App;
