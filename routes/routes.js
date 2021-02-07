const express = require("express");
const TodoTask = require("../models/todo");

const router = express.Router();

router.get("/", (req, res, next) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo", {
            "todoTasks": tasks,
        })
    })
});

router.post("/", (req, res, next) => {
    if (!req.body.content) {
        res.redirect("/");
    }
    const todoTask = new TodoTask({
        content: req.body.content
    });

    todoTask.save().then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
});

router.route("/edit/:id").get((req, res, next) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todo-edit", {
            todoTasks: tasks,
            idTask: id
        });
    });
}).post((req, res, next) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, {
        content: req.body.content
    }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

router.route("/remove/:id").get((req, res, next) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

module.exports = router;