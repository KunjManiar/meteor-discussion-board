import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import CustomButton from "../buttons/button.jsx";
import TextArea from "../text-area/TextArea.jsx";
import "./AddComment.css";

export default AddComment = ({ feedId }) => {
	const [text, setText] = useState("");
	const [err, setErr] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text) {
			setErr("Comment could not be empty");
			return;
		}
		console.log();
		Meteor.call("comments.feed.insert", { text, feedId }, (error, res) => {
			if (error) {
				setErr(error.error);
			} else {
				setText("");
			}
		});
	};

	return (
		<div className="main-add-comments-div">
			<div className="add-comment-div">
				<TextArea
					name="comment"
					placeholder="Add your comment"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></TextArea>
				<p style={{ color: "#B00020" }}>{err ? `❗️ ${err}` : ""}</p>
			</div>
			<div className="comment-buttons">
				<CustomButton
					style={{
						background: "transparent",
						border: "1px solid black",
						color: "#000",
						marginLeft: 4,
						marginRight: 4,
					}}
					onClick={() => setText("")}
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
					Comment
				</CustomButton>
			</div>
		</div>
	);
};
