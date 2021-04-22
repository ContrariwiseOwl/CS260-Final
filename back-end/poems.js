const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const poemSchema = mongoose.Schema({
    title: String,
    content: Array,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    form: String,
    written: {
        type: Date,
        default: Date.now
    }
});

const Poem = mongoose.model('Poem', poemSchema);

// create a new poem
router.post('/', validUser, async (req, res) => {
    if (req.body.title === "" || req.body.content.length === 0)
        return res.status(400).send({
            message: "Poems require a title and at least one line of content."
        });
    
    try {
        const oldPoem = await Poem.findOne({
            title: req.params.title,
            author: req.user
        });
        if (oldPoem)
            return res.status(400).send({
                message: "You may not post poems with duplicate titles."
            });

        let poem = new Poem({
            title: req.body.title,
            content: req.body.content,
            author: req.user,
            form: req.body.form
        });
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
            author: req.user
        }).sort({
            written: -1
        }).populate('author');
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
        }).populate('author');
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
        }).populate('author');
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

// get a single poem for editing
router.get("/edit/:id", validUser, async (req, res) => {
    try {
        let poem = await Poem.findOne({
            _id: req.params.id,
            author: req.user
        });
        if (!poem)
            return res.status(404).send({
                message: "No matching poem could be found"
            });

        return res.send(poem);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
})

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