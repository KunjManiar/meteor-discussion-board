import { Meteor } from "meteor/meteor";
import { CommentCollection } from "/imports/db/CommentCollection";

// Stop auto publish
// meteor remove autopublish

Meteor.publish("feed-comments", function publishFeeds({ feedId }) {
	return CommentCollection.find(
		{ feedId: feedId },
		{ sort: { createdAt: -1 } },
	);
});
