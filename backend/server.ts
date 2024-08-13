import express from "express";
import SpotifyWebApi from "spotify-web-api-node";

const app = express();

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirect_uri: "http://localhost:5173",
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
