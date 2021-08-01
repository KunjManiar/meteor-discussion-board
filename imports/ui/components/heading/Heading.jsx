import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { LogOut } from "@styled-icons/entypo/LogOut";
import Image from "../Image/Image";
import { useHistory } from "react-router-dom";
import { Code } from "@styled-icons/entypo/Code";
import { Home } from "@styled-icons/entypo/Home";

import "./heading.css";

export default Heading = () => {
	const user = useTracker(() => Meteor.user());
	const history = useHistory();
	return (
		<div className="heading">
			<div
				className="heading-left"
				onClick={() => {
					history.push("/");
				}}
			>
				<img
					src="https://res.cloudinary.com/kunj-maniar/image/upload/v1627835918/discussion-icons/3050525_hdotcc.png"
					style={{ width: 33 }}
				/>
				<h3 style={{ marginTop: 17, marginBottom: 5, marginLeft: 15 }}>
					Discussion Board
				</h3>
			</div>
			{user && (
				<div className="heading-right">
					{history.location.pathname === "/get-script" ? (
						<Home
							style={{ height: 25, padding: 10, cursor: "pointer" }}
							onClick={() => {
								history.push("/");
							}}
						/>
					) : (
						<Code
							style={{ height: 25, padding: 10, cursor: "pointer" }}
							onClick={() => {
								history.push("/get-script");
							}}
						/>
					)}
					<Image
						src={`https://ui-avatars.com/api/?name=${user.username}`}
						size={30}
						padding={10}
						style={{ cursor: "pointer" }}
						onClick={() => {}}
					/>

					<p style={{ cursor: "pointer" }} onClick={() => Meteor.logout()}>
						Logout
					</p>
					<LogOut
						style={{ height: 25, padding: 10, cursor: "pointer" }}
						onClick={() => Meteor.logout()}
					/>
				</div>
			)}
		</div>
	);
};
