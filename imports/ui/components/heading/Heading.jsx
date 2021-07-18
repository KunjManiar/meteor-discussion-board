import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { LogOut } from "@styled-icons/entypo/LogOut";
import Image from "../Image/Image";

import "./heading.css";

export default Heading = () => {
	const user = useTracker(() => Meteor.user());
	return (
		<div className="heading">
			<div className="heading-left">
				<h3>Discussion Board</h3>
			</div>
			{user && (
				<div className="heading-right" onClick={() => Meteor.logout()}>
					<Image
						src={`https://ui-avatars.com/api/?name=${user.username}`}
						size={30}
						padding={10}
						style={{ cursor: "pointer" }}
						onClick={() => {}}
					/>

					<p style={{ cursor: "pointer" }}>Logout</p>
					<LogOut style={{ height: 25, padding: 10, cursor: "pointer" }} />
				</div>
			)}
		</div>
	);
};
