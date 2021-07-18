import { Meteor } from "meteor/meteor";
import { FeedCollection } from "/imports/db/FeedCollection";

// Stop auto publish
// meteor remove autopublish

Meteor.publish("feeds", function publishFeeds() {
	return FeedCollection.find({}, { sort: { createdAt: -1 } });
});
