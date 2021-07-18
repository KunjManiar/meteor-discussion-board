import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { CommentCollection } from "../../db/CommentCollection";

Meteor.methods({
	"comments.feed.insert"({ text, feedId }) {
		check(text, String);
		check(feedId, String);

		if (!this.userId) {
			throw new Meteor.Error("Not authorized.");
		}
		CommentCollection.insert({
			text,
			feedId,
			createdAt: new Date(),
			userId: this.userId,
		});
		return { status: "success" };
	},

	"comments.comment.insert"({ text, commentId }) {
		check(text, String);
		check(commentId, String);

		if (!this.userId) {
			throw new Meteor.Error("Not authorized.");
		}
		CommentCollection.insert({
			text,
			commentId,
			createdAt: new Date(),
			userId: this.userId,
		});
		return { status: "success" };
	},
});
