import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Accounts } from "meteor/accounts-base";
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
