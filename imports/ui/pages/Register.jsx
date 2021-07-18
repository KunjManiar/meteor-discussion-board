import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { validateEmail } from "../helpers/validator";
import CustomInput from "../components/Input.jsx";
import CustomButton from "../components/buttons/button.jsx";
import FormButton from "../components/buttons/form-button.jsx";
import Loader from "../components/loader/loader.jsx";

export default RegisterForm = () => {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");
	const user = useTracker(() => Meteor.user());

	const history = useHistory();

	if (!!user) {
		history.push("/");
	}

	const handleSubmit = (e) => {
		if (!email || !password || !username) {
			setErr("Username, Email & password are required");
			return;
		}
		if (!validateEmail(email)) {
			setErr("Incorrect Email");
			return;
		}

		setLoading(true);
		e.preventDefault();
		Accounts.createUser(
			{
				username,
				email,
				password,
			},
			function (error) {
				console.log(error);
				if (!!error) setErr(error.reason);
				setLoading(false);
			},
		);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="main-div">
			<Heading />
			<div className="form-div">
				<div>
					<h1 className="center-form-heading">Sign Up</h1>
					<div style={{ flexDirection: "row" }}>
						<span style={{ fontFamily: "Montserrat", fontSize: 18 }}>
							Already a member?
						</span>
						<CustomButton
							onClick={() => {
								history.push("/login");
							}}
						>
							Log In
						</CustomButton>
					</div>
					<p style={{ color: "#B00020" }}>{err ? `❗️ ${err}` : ""}</p>
				</div>
				<div style={{ marginTop: 20, marginBottom: 10 }}>
					<form className="login-form" onSubmit={handleSubmit}>
						<CustomInput
							type="text"
							label="Username"
							name="username"
							setInput={setUsername}
						/>
						<CustomInput
							type="email"
							label="Email"
							name="email"
							setInput={setEmail}
						/>
						<CustomInput
							type="password"
							label="Password"
							name="password"
							setInput={setPassword}
						/>
					</form>
				</div>
				<div>
					<FormButton onClick={handleSubmit}>Sign Up</FormButton>
				</div>
			</div>
		</div>
	);
};
