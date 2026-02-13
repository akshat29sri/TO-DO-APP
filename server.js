const express = require("express");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add new task
app.post("/tasks", (req, res) => {
    const newTask = {
        _id: Date.now(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        completed: false
    };
    tasks.push(newTask);
    res.json(newTask);
});

// Toggle complete
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t._id == req.params.id);
    if (task) task.completed = !task.completed;
    res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t._id != req.params.id);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});
