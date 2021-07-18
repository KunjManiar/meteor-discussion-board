import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useHistory } from "react-router-dom";
import Image from "./components/Image/Image.jsx";
import Discussion from "./pages/Discussion.jsx";
import Heading from "./components/heading/Heading.jsx";
import NewDiscussionButton from "./components/buttons/new-discussion.jsx";

export default App = () => {
	const history = useHistory();
	const user = useTracker(() => Meteor.user());

	if (!user) {
		history.push("/login");
	}
	return (
		<div className="main-div">
			<div className="main-discussion-div">
				<Heading />
				<NewDiscussionButton
					onClick={() => {
						history.push("/new-discussion");
					}}
				/>
				<Discussion />
			</div>
		</div>
	);
};
