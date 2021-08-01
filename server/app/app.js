import express from "express";
import routes from "./routes";

const cors = require("cors");
const app = express();

app.use(
	express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }),
);
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/status", (req, res) => {
	res.status(200).end();
});

app.use(routes);

export default app;
