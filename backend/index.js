require("dotenv").config();

const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const REDIRECT_URL = process.env.REDIRECT_URL;

const CLIENT_SECRET = process.env.CLIENT_SECRET;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (res) => {
	res.send("Server is working!");
});

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: `${REDIRECT_URL}`,
		clientId: "7e8eea6f397341778fa5b6167d418e34",
		clientSecret: `${CLIENT_SECRET}`,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch(() => {
			res.sendStatus(400);
		});
});

app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	console.log(refreshToken);

	const spotifyApi = new SpotifyWebApi({
		redirectUri: `${REDIRECT_URL}`,
		clientId: "7e8eea6f397341778fa5b6167d418e34",
		clientSecret: `${CLIENT_SECRET}`,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch(() => {
			res.sendStatus(400);
		});
});

app.listen(3000);
