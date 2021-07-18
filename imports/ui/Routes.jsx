//  meteor npm install --save bcrypt

// https://bootsnipp.com/snippets/00ADR
// https://bootsnipp.com/tags/login?page=3
// https://bbbootstrap.com/snippets/bootstrap-comment-section-reply-input-and-vote-up-and-down-73363704
// https://bbbootstrap.com/similar/bootstrap-comment-section-reply-input-and-vote-up-and-down-73363704
// https://download.cnet.com/HTTrack-Website-Copier-64-bit/3000-2377_4-75300477.html
// https://www.wix.com/website-template/view/html/1967?siteId=8cc2b437-b3ff-4e24-9fb6-bd8b51c1018f&metaSiteId=5a0f1f68-6e76-4be4-b69a-225730e1d2fe&originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fcommunities%2Fonline-forum&tpClick=view_button
// https://www.wix.com/website/templates/html/communities/online-forum

// caxovi6088@nhmty.com.
// Caxovi6088@

import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

import MainLayout from "./layouts/MainLayout";
import App from "./App";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import NewFeed from "./pages/NewFeed";

Meteor.startup(() => {
	ReactDOM.render(
		<BrowserRouter>
			<Switch>
				<Route path="/login">
					<LoginForm />
				</Route>
				<Route path="/register">
					<RegisterForm />
				</Route>
				<Route path="/new-discussion">
					<NewFeed />
				</Route>
				<Route exact path="/">
					<App />
				</Route>
			</Switch>
		</BrowserRouter>,
		// <Router history={browserHistory}>
		// 	<Route path="/" component={MainLayout}>
		// 		{/* <IndexRoute component={App} /> */}
		// 		{/* <Route path="/login" component={LoginForm} /> */}
		// 		{/* <Route path="/about" component={About} /> */}
		// 		{/* <Route path="/items/:id" component={App} /> */}
		// 	</Route>
		// </Router>
		document.getElementById("react-target"),
	);
});
