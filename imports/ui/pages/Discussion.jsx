import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect } from "react";
import Feed from "../components/feed/Feed.jsx";
import Loader from "../components/loader/loader.jsx";
import { FeedCollection } from "/imports/db/FeedCollection";

export default Discussion = () => {
	const { feeds, isLoading } = useTracker(() => {
		const noDataAvailable = { feeds: [] };
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe("feeds");

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}

		const feeds = FeedCollection.find(
			{},
			{
				sort: { createdAt: -1 },
			},
		).fetch();
		// const pendingTasksCount = FeedCollection.find(pendingOnlyFilter).count();
		// console.log(feeds);
		return { feeds, isLoading: false };
	});

	// console.log(feeds);

	if (isLoading) {
		return <Loader />;
	}

	// useEffect(() => {}, [feeds]);

	return (
		<div className="discussion">
			{feeds.map((feed) => {
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
			})}
			{/* <Feed />
			<Feed /> */}
		</div>
	);
};
