const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const url = require("url")
const cors = require("cors");
const uuid = require("uuid").v4;
const open = require("open")
const multer = require("multer");
const youtube = require("youtube-api");
const credential = require("./Credentials1.json")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: './videos',
    filename(req, file, cb) {
        const newFileName = `${uuid()}-${file.originalname}`
        cb(null, newFileName)
    }
})

const upload = multer({ storage }).single("videoFile")

const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credential.web.client_id,
    client_secret: credential.web.client_secret,
    redirect_url: credential.web.redirect_uris[0]
})

app.post("/upload", upload, (req, res) => {
    if (req.file) {
        const filename = req.file.filename;
        const { title, description } = req.body;

        open(oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/youtube.upload',
            state: JSON.stringify({ title, description, filename })
        }))
    }
})

app.get("/success", (req, res) => {
    const { title, description, filename } = JSON.parse(req.query.state)

    oAuth.getToken(req.query.code, async (err, tokens) => {
        try {
            if (err) throw err

            oAuth.setCredentials(tokens)

            const file = path.join(__dirname, "videos", filename)

            const response = await youtube.videos.insert({
                resource: {
                    snippet: { title, description },
                    status: { privacyStatus: 'private' }
                },
                part: 'snippet, status',
                media: {
                    body: fs.createReadStream(file)
                }
            })
            if (response.status !== 200) {
                res.redirect("http://localhost:3000");
            }
            const youtubeLink = `https://youtu.be/${response.data.id}`;
            res.redirect(url.format({
                pathname: "http://localhost:3000/success",
                query: {
                    url: youtubeLink
                }
            }));
        } catch (e) {
            console.log(e);
            res.redirect("http://localhost:3000");
        }
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
