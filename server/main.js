import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Accounts } from "meteor/accounts-base";
import jwt from "jsonwebtoken";
// import { FeedCollection } from "/imports/db/FeedCollection";
import "/imports/api/feed/feedMethods";
import "/imports/api/feed/feedPublications";
import "/imports/api/user/userPublications";

import "/imports/api/comment/commentMethods";
import "/imports/api/comment/commentPublications";

import app from "./app/app";

// const SEED_EMAIL = "kunj@gmail.com";
// const SEED_USERNAME = "Kunj";
// const SEED_PASSWORD = "password";

Meteor.startup(() => {
	// WebApp.connectHandlers.use("/upload", upload.s)
	// WebApp.connectHandlers.use("/upload", function (req, res) {
	// 	const file = req.file;
	// 	// do something with the file
	// });
	WebApp.connectHandlers.use(app);
	Meteor.methods({
		"user.sign_jwt"({ website }) {
			if (!this.userId) {
				throw new Meteor.Error("Not authorized.");
			}
			const secret =
				Meteor.settings.jwt_secrets.part_one +
				website +
				Meteor.settings.jwt_secrets.part_two;

			const token = jwt.sign({ userId: this.userId, website: website }, secret);

			return { token };
		},
	});

	// If the Links collection is empty, add some data.
	// if (!Accounts.findUserByEmail(SEED_EMAIL)) {
	// 	Accounts.createUser({
	// 		email: SEED_EMAIL,
	// 		username: SEED_USERNAME,
	// 		password: SEED_PASSWORD,
	// 	});
	// }
	// const user = Accounts.findUserByEmail(SEED_EMAIL);
	// console.log(user);
});
