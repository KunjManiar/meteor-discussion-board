import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import moment from "moment";
import { CommentCollection } from "/imports/db/CommentCollection";
import Loader from "../loader/loader";
import "./Comments.css";

const Comment = ({ borderTop = false, comment }) => {
	const borderClasses = borderTop && "single-comment-border-top";

	const { user, isLoading } = useTracker(() => {
		const noDataAvailable = { user: {}, isLoading: true };
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe("users", comment.userId);

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}

		const users = Meteor.users.find({ _id: comment.userId }).fetch();
		return { user: !!users && users.length ? users[0] : {}, isLoading: false };
	});

	if (!user || isLoading) {
		return <Loader fullPage={false} />;
	}

	return (
		<div className="comments">
			<div className={`single-comment-main-div ${borderClasses}`}>
				<div className="single-comment-div">
					<pre className="single-comment">{comment.text}</pre>
				</div>
				<div className="single-commemt-person-details">
					<img
						className="single-heading-person-details-img"
						src={`https://ui-avatars.com/api/?name=${user.username}`}
						height={18}
						width={18}
					/>
					<p className="single-comment-person-details-p-dot"> • </p>
					<p className="single-comment-person-details-p">
						{user.emails && user.emails[0].address}
					</p>
					<p className="single-comment-person-details-p-dot"> • </p>
					<p className="single-comment-person-details-p">
						{moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Comments = ({ feedId }) => {
	const { comments, isLoading, comments_length } = useTracker(() => {
		const noDataAvailable = {
			comments: [],
			isLoading: true,
			comments_length: 0,
		};
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe("feed-comments", { feedId });

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}

		const comments = CommentCollection.find({ feedId }).fetch();
		return {
			comments: comments,
			isLoading: false,
			comments_length: comments.length,
		};
	});

	if (isLoading) {
		return <Loader fullPage={false} />;
	}

	return (
		<div>
			{comments.map((comment) => {
				if (comments_length == 1) {
					return <Comment comment={comment} key={comment._id} />;
				}
				return <Comment comment={comment} borderTop={true} key={comment._id} />;
			})}
		</div>
	);
};
