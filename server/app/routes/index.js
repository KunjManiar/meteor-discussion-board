import { Meteor } from "meteor/meteor";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";
import app from "../app";

import { FeedCollection } from "../../../imports/db/FeedCollection";

cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret,
});

const router = express.Router();

const fileNameExt = (fileName) => {
	const arr = fileName.split(".");
	const ext = arr.pop();
	const file_name = arr.join(".");
	return {
		fileName: file_name,
		extension: ext,
	};
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// cb(null, "./uploads/");
		fs.mkdir("uploads/", (err) => {
			cb(null, "uploads/");
		});
	},

	filename: function (req, file, cb) {
		console.log(file);
		const { fileName, extension } = fileNameExt(file.originalname);
		cb(null, fileName + "_" + new Date().valueOf() + "." + extension);
	},
});

const upload = multer({ storage: storage });

function asyncCloudinaryUpload(fileName, options) {
	return new Promise(function (resolve, reject) {
		cloudinary.v2.uploader.upload(fileName, options, function (error, result) {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}

function asyncFeedAdd({ heading, text, image }) {
	return new Promise(function (resolve, reject) {
		Meteor.call("feeds.insert", { heading, text, image }, (error, res) => {
			if (error) {
				reject(error);
			}
			resolve(res);
		});
	});
}

function asyncFeedAddCollection({ userId, heading, text, image }) {
	return new Promise(function (resolve, reject) {
		FeedCollection.insert(
			{ heading, text, image, createdAt: new Date(), userId },
			(error, res) => {
				if (error) {
					reject(error);
				}
				resolve(res);
			},
		);
	});
}

router.post(
	"/kunj-test-file-upload",
	upload.any("file"),
	async (req, res, next) => {
		try {
			console.log(req.body);
			// for (let i in req.body) {
			// 	console.log(req.body.text);
			// }
			const file = req.files[0];
			console.log(req.files[0]);

			const fileAndExt = fileNameExt(file.filename);
			// cloudinary.v2.uploader.upload(
			// 	file.destination + file.filename,
			// 	{ public_id: `discussion-image/${fileAndExt.fileName}` },
			// 	function (error, result) {
			// 		console.log(error);
			// 		console.log(result);
			// 	},
			// );

			const userId = "FeH356bXezexcWQsj";

			const file_path = file.destination + file.filename;
			const file_upload_options = {
				public_id: `discussion-image/${fileAndExt.fileName}`,
			};

			const cloudinary_op = await asyncCloudinaryUpload(
				file_path,
				file_upload_options,
			);

			const { heading, text } = req.body;

			const result = await asyncFeedAddCollection({
				userId,
				heading,
				text,
				image: cloudinary_op.secure_url,
			});

			// const result = await asyncFeedAdd({
			// 	// heading,
			// 	// text,
			// 	// image: cloudinary_op.secure_url,
			// });
			console.log(result);
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	},
);

export default router;
