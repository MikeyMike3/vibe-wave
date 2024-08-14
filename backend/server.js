const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: "http://localhost:5173",
		clientId: "7e8eea6f397341778fa5b6167d418e34",
		clientSecret: "e8a938d483a5474f99a3330eae21549a",
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

	const spotifyApi = new SpotifyWebApi({
		redirectUri: "http://localhost:5173",
		clientId: "7e8eea6f397341778fa5b6167d418e34",
		clientSecret: "e8a938d483a5474f99a3330eae21549a",
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch(() => {
			res.sendStatus(400);
		});
});

app.listen(3000);
