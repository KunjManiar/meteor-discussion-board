import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import moment from "moment";
import AddComment from "./AddComment.jsx";
import Comments from "./Comments.jsx";
import Image from "../Image/Image.jsx";
// import { UserCollection } from "/imports/db/UserCollection";
import "./feed.css";
import Loader from "../loader/loader.jsx";

export default Feed = ({ feed }) => {
	const { user, isLoading } = useTracker(() => {
		const noDataAvailable = { user: {}, isLoading: true };
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe("users", feed.userId);

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}

		const users = Meteor.users.find({ _id: feed.userId }).fetch();
		return { user: !!users && users.length ? users[0] : {}, isLoading: false };
	});

	if (!user || isLoading) {
		return <Loader />;
	}

	return (
		<div className="feed-div">
			<div className="feed-heading-div">
				<div className="feed-heading-person-details">
					<Image
						padding={5}
						src={`https://ui-avatars.com/api/?name=${user.username}`}
						size={25}
					/>
					<p className="feed-heading-person-details-p-dot"> • </p>
					<p className="feed-heading-person-details-p">{user.username}</p>
					<p className="feed-heading-person-details-p-dot"> • </p>
					<p className="feed-heading-person-details-p">
						{moment(feed.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
					</p>
					{/* <p className="feed-heading-person-details-p-dot"> • </p>
					<p className="feed-heading-person-details-p">2 min read</p> */}
				</div>
				<div className="feed-heading-header-details">
					<h1 className="feed-heading">{feed.heading}</h1>
				</div>
			</div>
			<div className="feed-description">
				<pre className="feed-description-pre">{feed.text}</pre>
			</div>
			<div>
				<AddComment feedId={feed._id} />
				<Comments feedId={feed._id} />
			</div>
		</div>
	);
};
