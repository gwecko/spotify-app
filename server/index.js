import express from 'express';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express()

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/public/src"))

const PORT = 8000

var stateKey = "spotify_auth_state"
// const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET
// })


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated stringh
 */
var generateRandomString = function (length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/', (req, res) => {
    res.send("Hello world!")
    // res.sendFile(path.resolve(__dirname, '../client/src/index.jsx'));
});

app.post('/login', async (req, res) => {
    try {
        var state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        var scope = "user-read-private user-read-email user-top-read";
        res.redirect(
            "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            })
        );
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

app.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var { code, state } = req.query || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
            querystring.stringify({
                error: "state_mismatch",
            })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code",
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer.from(client_id + ":" + client_secret).toString("base64"),
            },
            json: true,
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                access_token = body.access_token;
                var { access_token, refresh_token } = body

                res.redirect("/#" +
                    querystring.stringify({
                        client: "spotify",
                        access_token: access_token,
                        refresh_token: refresh_token,
                    })
                );
            } else {
                res.send("There was an error during authentication.");
            }
        });
    }
}); 

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
