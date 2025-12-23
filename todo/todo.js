const fs = require('fs');
const filePath = './tasks.json';

const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
    const tasks = loadTask();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Tasks added successfully!");
}

const listTasks = () => {
    const tasks = loadTask();
    tasks.forEach((task,index) => console.log(`${index + 1} - ${task.task}`)
    )
}

const removeTask = (task) => {
    const tasks = loadTask();
    if (task >= 1 && task <= tasks.length) {
        tasks.splice(task - 1, 1);
        saveTasks(tasks);
        console.log("Task removed successfully!");
    } else {
        console.log("Invalid task number!");
    }
}

const command = process.argv[2];
const argument = process.argv[3];

if(command === 'add'){
    addTask(argument);
} else if (command === 'list') {
    listTasks();
} else if (command === 'remove'){
    removeTask(parseInt(argument));
} else {
    console.log("Command not valid!");
}