import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
// import { FeedCollection } from "/imports/db/FeedCollection";
import "/imports/api/feed/feedMethods";
import "/imports/api/feed/feedPublications";
import "/imports/api/user/userPublications";

import "/imports/api/comment/commentMethods";
import "/imports/api/comment/commentPublications";

// const SEED_EMAIL = "kunj@gmail.com";
// const SEED_USERNAME = "Kunj";
// const SEED_PASSWORD = "password";

Meteor.startup(() => {
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
