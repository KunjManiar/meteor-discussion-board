import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/loader/loader.jsx";
import CustomInput from "../components/Input.jsx";
import CustomButton from "../components/buttons/button.jsx";
import FormButton from "../components/buttons/form-button.jsx";

import Heading from "../components/heading/Heading.jsx";

import "./script.css";

export default Script = () => {
	const history = useHistory();
	const [website, setWebsite] = useState("");
	const [meta, setMeta] = useState("");
	const [err, setErr] = useState("");
	const user = useTracker(() => Meteor.user());

	if (!user) {
		history.push("/login");
	}
	const isLoading = false;

	if (isLoading) {
		return <Loader />;
	}

	// useEffect(() => {}, [feeds]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!website) {
			setErr("Both Heading and Description are required");
			return;
		}

		Meteor.call("user.sign_jwt", { website }, (error, res) => {
			if (error) {
				// console.log(website);
				console.log(error);
				setErr(error.error);
			} else {
				// console.log(res);
				setMeta(res.token);
				// history.push("/");
			}
		});
	};

	handleCopy = (e) => {
		e.preventDefault();
		const script = `<script id="meteor-discussion-script" meta="${meta}" src="https://kunjmaniar.github.io/discussion-script/discussion-board-script.js"></script>`;
		// e.clipboardData.setData(
		// 	"text/plain",
		// 	script,
		// );
		navigator.clipboard.writeText(script);
	};

	return (
		<div className="script">
			<Heading />
			<h1 className="script-heading">Add Script Website</h1>
			<h3 className="script-description">
				Click Screenshots and Start Discussion
			</h3>
			<p style={{ color: "#B00020" }}>{err ? `❗️ ${err}` : ""}</p>

			{/* {feeds.map((feed) => {
				return (
					<Feed
						heading={feed.heading}
						text={feed.text}
						createdAt={feed.createdAt}
						userId={feed.userId}
						feed={feed}
						key={feed._id}
					/>
				);
			})} */}
			{/* <Feed />
			<Feed /> */}
			<div style={{ maxWidth: 450 }}>
				<CustomInput
					type="text"
					label="Website Host"
					name="website"
					setInput={setWebsite}
					placeholder="Ex: jwt.io"
				/>
				<FormButton
					style={{
						background: "#000",
						color: "#fff",
						border: "1px solid black",
						marginLeft: 4,
						marginRight: 4,
					}}
					onClick={handleSubmit}
				>
					Get Script
				</FormButton>
			</div>
			{meta && (
				<pre
					className="script-code"
					style={{ cursor: "pointer" }}
					onClick={handleCopy}
				>
					{`Click to copy script with meta 
<script ... src="https://kunjmaniar.github.io/discussion-script/discussion-board-script.js"></script>
`}
				</pre>
			)}
			{/* <p>script</p> */}
		</div>
	);
};
