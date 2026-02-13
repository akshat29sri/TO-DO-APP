const API = "http://localhost:5000/tasks";

const taskList = document.getElementById("taskList");

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = "";
            data.forEach(task => {
                const li = document.createElement("li");

                const text = document.createElement("span");
                text.textContent = `${task.title} - ${task.subtitle}`;
                if (task.completed) text.classList.add("completed");

                const actions = document.createElement("div");
                actions.classList.add("actions");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.onclick = () => toggleTask(task._id);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.onclick = () => deleteTask(task._id);

                actions.appendChild(checkbox);
                actions.appendChild(deleteBtn);

                li.appendChild(text);
                li.appendChild(actions);

                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const title = document.getElementById("title").value;
    const subtitle = document.getElementById("subtitle").value;

    if (!title) return alert("Title required");

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("title").value = "";
        document.getElementById("subtitle").value = "";
        loadTasks();
    });
}

function toggleTask(id) {
    fetch(`${API}/${id}`, {
        method: "PUT"
    })
    .then(res => res.json())
    .then(() => loadTasks());
}

function deleteTask(id) {
    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => loadTasks());
}

loadTasks();
