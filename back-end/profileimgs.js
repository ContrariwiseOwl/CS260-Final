const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// configure multer and upload location
const multer = require('multer');
const upload = multer({
    dest: '../front-end/public/images/profiles/',
    limits: {
        fileSize: 50000000
    }
});

const users = require("./users.js");
const validUser = users.valid;

const profileImgSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const ProfileImg = mongoose.model('ProfileImg', profileImgSchema);

// upload profile img
router.post("/", validUser, upload.single('photo'), async (req, res) => {
    if (!req.file)
        return res.status(400).send({
            message: "Must upload a file"
        });
    
    const photo = new ProfileImg({
        user: req.user,
        path: "/images/profiles/" + req.file.filename
    });
    try {
        await photo.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all previous profile imgs
router.get('/', validUser, async (req, res) => {
    try {
        let photos = await ProfileImg.find({
            user: req.user
        }).sort({
            created: -1
        });
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const photo = await ProfileImg.findOne({
            _id: req.params.id
        });
        return res.send(photo);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: ProfileImg,
    routes: router,
}