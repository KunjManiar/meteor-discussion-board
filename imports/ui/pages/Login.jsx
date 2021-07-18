import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomInput from "../components/Input.jsx";
import CustomButton from "../components/buttons/button.jsx";
import FormButton from "../components/buttons/form-button.jsx";
import Heading from "../components/heading/Heading.jsx";
import Loader from "../components/loader/loader.jsx";

export default LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const user = useTracker(() => Meteor.user());
	const history = useHistory();

	if (!!user) {
		history.push("/");
	}

	const [err, setErr] = useState("");

	// useEffect(() => {
	// 	if(err && )
	// }, [err, user])

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		// try

		if (!email || !password) {
			setErr("Email/Username and password are required");
			return;
		}

		console.log(email, password);
		Meteor.loginWithPassword(email, password, function (error) {
			console.log(error);
			if (!!error) setErr(error.reason);
			setLoading(false);
		});
		// console.log(user);
		// if (!!user) history.push("/");
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="main-div">
			<Heading />
			<div className="form-div">
				<div>
					<h1 className="center-form-heading">Log In</h1>
					<div style={{ flexDirection: "row" }}>
						<span style={{ fontFamily: "Montserrat", fontSize: 18 }}>
							New to this site?
						</span>
						<CustomButton
							onClick={() => {
								history.push("/register");
							}}
						>
							Sign Up
						</CustomButton>
					</div>
					<p style={{ color: "#B00020" }}>{err ? `❗️ ${err}` : ""}</p>
				</div>
				<div style={{ marginTop: 20, marginBottom: 10 }}>
					<form className="login-form" onSubmit={handleSubmit}>
						<CustomInput
							type="text"
							label="Username/Email "
							name="email"
							setInput={setEmail}
						/>
						<CustomInput
							type="password"
							label="Password"
							name="password"
							setInput={setPassword}
						/>
						<input type="submit" hidden />
					</form>
				</div>
				<div>
					<FormButton onClick={handleSubmit}>Sign In</FormButton>
				</div>
			</div>
		</div>
	);
};
