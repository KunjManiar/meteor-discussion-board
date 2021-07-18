import { Meteor } from "meteor/meteor";
// import { UserCollection } from "/imports/db/UserCollection";

// Stop auto publish
// meteor remove autopublish

Meteor.publish("users", function publishUsers(userId) {
	return Meteor.users.find(
		{ _id: userId },
		{ fields: { username: 1, emails: 1 } },
	);
});
