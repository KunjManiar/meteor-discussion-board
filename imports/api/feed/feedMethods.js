import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { FeedCollection } from "../../db/FeedCollection";

Meteor.methods({
	"feeds.insert"({ heading, text, image }) {
		check(heading, String);
		check(text, String);
		// check(image, String);

		if (!this.userId) {
			throw new Meteor.Error("Not authorized.");
		}
		FeedCollection.insert({
			heading,
			text,
			image,
			createdAt: new Date(),
			userId: this.userId,
		});
		return { status: "success" };
	},

	"feeds.remove"(feedId) {
		check(feedId, String);

		if (!this.userId) {
			throw new Meteor.Error("Not authorized.");
		}

		const feed = FeedCollection.findOne({ _id: feedId, userId: this.userId });

		if (!feed) {
			throw new Meteor.Error("Access denied.");
		}

		FeedCollection.remove(feedId);
	},
});
