const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const poemSchema = mongoose.schema({
    title: String,
    content: Array,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    form: {
        type: String,
        default: "None"
    },
    written: {
        type: Date,
        default: Date.now
    }
});

const Poem = mongoose.model('Poem', poemSchema);

router.post('/', validUser, async (req, res) => {
    if (req.body.title === "" || req.body.content.length === 0)
        return res.status(400).send({
            message: "Poems require a title and at least one line of content."
        });

    if (req.body.form === "")
        let poem = new Poem({
            title: req.body.title,
            content: req.body.content,
            author: req.user
        });
    else
        let poem = new Poem({
            title: req.body.title,
            content: req.body.content,
            author: req.user,
            form: req.body.form
        });

    try {
        await poem.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get user's poems
router.get("/", validUser, async (req, res) => {
    try {
        let poems = await Poem.find({
            user: req.user
        }).sort({
            written: -1
        }).populate('user');
        return res.send(poems);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all poems
router.get("/all", async (req, res) => {
    try {
        let poems = await Poem.find().sort({
            written: -1
        }).populate('user');
        return res.send(poems);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get a single poem using its _id
router.get("/:id", async (req, res) => {
    try {
        let poem = await Poem.findOne({
            _id: req.params.id
        });
        if (!poem)
            return res.status(404).send({
                message: "No poem could be found"
            });
        return res.send(poem);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

// create a new poem
router.post("/", validUser, async (req, res) => {
    try {
        const oldPoem = await Poem.findOne({
            title: req.params.title,
            author: req.user
        });
        if (poem)
            return res.status(400).send({
                message: "You may not post poems with duplicate titles."
            });

        if (req.body.form !== "")
            let poem = new Poem({
                title: req.body.title,
                content: req.body.content,
                author: req.user,
            });
        else
            let poem = new Poem({
                title: req.body.title,
                content: req.body.content,
                author: req.user,
                form: req.body.form
            });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// update an edited poem
router.put("/:id", validUser, async (req, res) => {
    try {
        let poem = await Poem.findOne({
            _id: req.params.id
        });
        if (!poem)
            return res.status(404).send({
                message: "No poem could be found"
            });
        
        poem.title = req.body.title;
        poem.content = req.body.content;
        if (req.body.form !== "")
            poem.form = req.body.form;
        
        await poem.save();
        return res.send(poem);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete("/:id", validUser, async (req, res) => {
    try {
        let poem = await Poem.findOne({
            _id: req.params.id
        });
        if (!poem)
            return res.sendStatus(404);
        
        await poem.delete();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Poem,
    routes: router,
}