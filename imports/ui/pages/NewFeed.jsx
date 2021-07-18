import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import TextArea from "../components/text-area/TextArea.jsx";
import CustomButton from "../components/buttons/button";
import Forum from "../components/feed/Feed.jsx";
import "./NewFeed.css";
import { useHistory } from "react-router-dom";

export default NewFeed = () => {
	const history = useHistory();
	const [text, setText] = useState("");
	const [heading, setHeading] = useState("");
	const [err, setErr] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!heading || !text) {
			setErr("Both Heading and Description are required");
			return;
		}

		Meteor.call("feeds.insert", { heading, text }, (error, res) => {
			if (error) {
				setErr(error.error);
			} else {
				setText("");
				setHeading("");
				history.push("/");
			}
		});
	};

	return (
		<div className="new-discussion-div">
			<h1 className="Adobe-Caslon italic" style={{ fontSize: 55 }}>
				Start a New Discussion
			</h1>
			<p style={{ color: "#B00020" }}>{err ? `❗️ ${err}` : ""}</p>
			<div className="new-discussion-heading-div">
				<input
					className="new-discussion-heading-input"
					placeholder="Give the discussion a title"
					onChange={(e) => setHeading(e.target.value)}
					style={{ padding: 10 }}
				/>
			</div>
			<div className="new-discussion-description-div">
				<TextArea
					name="comment"
					placeholder="Write your description here."
					style={{ minHeight: 350, fontSize: 18 }}
					onChange={(e) => setText(e.target.value)}
				></TextArea>
			</div>
			<div className="new-discussion-buttons">
				<CustomButton
					style={{
						background: "transparent",
						border: "1px solid black",
						color: "#000",
						marginLeft: 4,
						marginRight: 4,
					}}
					onClick={() => {
						history.push("/");
					}}
				>
					Cancel
				</CustomButton>
				<CustomButton
					style={{
						background: "#000",
						color: "#fff",
						border: "1px solid black",
						marginLeft: 4,
						marginRight: 4,
					}}
					onClick={handleSubmit}
				>
					Publish
				</CustomButton>
			</div>
		</div>
	);
};
