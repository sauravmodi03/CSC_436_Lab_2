const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = process.env.PRIVATE_KEY;

router.use(function (req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
                algorithms: ["RS256"],
            });
            next();
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    } else {
        return res.status(401).json({ error: "Authorization header missing." });
    }
});

router.post("/", async function (req, res) {
    const post = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,
        isCompleted: req.body.isCompleted,
        dateCreated: new Date().toLocaleDateString(),
        dateComplete: req.body.isComplete ? new Date().toLocaleDateString() : null
    });
    post.save()
        .then((savedTodo) => {
            return res.status(201).json({
                todo: {
                    _id: savedTodo._id,
                    title: savedTodo.title,
                    description: savedTodo.description,
                    author: savedTodo.author,
                    isCompleted: savedTodo.isCompleted,
                    dateCreated: savedTodo.dateCreated,
                    dateComplete: savedTodo.dateComplete,
                }
            });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.get("/", async function (req, res) {
    Todo.find()
        .where("author")
        .equals(req.payload.id)
        .then((todos) => {
            return res.status(200).json(todos);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.delete("/:id", async function (req, res) {
    Todo.findByIdAndDelete(req.params.id)
        .then(todo => {
            return res.status(200).json({ id: todo._id });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        })
});

router.put("/:id", async function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then(todo => {
            console.log(todo);
            return res.status(200).json(todo);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        })
});

module.exports = router;