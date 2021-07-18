import React from "react";
import { CommentAdd } from "@styled-icons/boxicons-solid/CommentAdd";
import "./button.css";

export default NewDiscussionButton = ({ onClick }) => {
	return (
		<div className="new-discussion-button-div" onClick={onClick}>
			<CommentAdd
				style={{
					height: 20,
					color: "#fff",
					paddingLeft: 10,
					paddingRight: 10,
					paddingTop: 1,
				}}
			/>
			<p style={{ color: "#fff" }}>Start a new Discussion</p>
		</div>
	);
};
