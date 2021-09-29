const http = require("http");
const port = 3000;
const chalk = require('chalk');
const fs = require("fs");
const server = http.createServer((req, res) => { });
const yargs = require('yargs');
const args = yargs.argv;
var noteAlreadyTaken = 0;
var noteNotFound = 0;
const manageList = (operation) => {
    var existingData = fs.readFileSync("./Data/notes.json");
    var obj = JSON.parse(existingData)
    var keys = Object.keys(obj);
    if (operation === "add") {
        for (var i = 0; i < keys.length; i++) {
            if (obj[keys[i]].title === args.title) {
                console.log(chalk.black.bgRedBright.bold("Title already taken!"));
                noteAlreadyTaken = 1;
                return
            }
        }
        if (noteAlreadyTaken === 0) {
            var newData = {
                "title": args.title,
                "body": args.body
            }
            obj.push(newData)
            var addNewData = JSON.stringify(obj);
            fs.writeFile("./Data/notes.json", addNewData, (err, data) => {
                console.log(chalk.black.bgGreenBright.bold("New note created!"))
            });
            noteAlreadyTaken = 0;
        }
    }
    else {
        for (var i = 0; i < keys.length; i++) {
            if (obj[keys[i]].title === args.title) {
                noteNotFound = 1;
                break;
            }
        }
        if (noteNotFound === 1) {
            for (var i = 0; i < keys.length; i++) {
                if (obj[keys[i]].title === args.title) {
                    delete obj[keys[i]];
                    break;
                }
            }
            obj = obj.filter(function (col) {
                return col.title !== args.title;
            })
            var deleteNote = JSON.stringify(obj);
            fs.writeFile("./Data/notes.json", deleteNote, (err, data) => {
                console.log(chalk.black.bgGreenBright.bold("Note removed!"))
            });
            noteNotFound = 0
        }
        else {
            console.log(chalk.black.bgRedBright.bold("Note not found!"));
            noteNotFound = 0
        }
    }
}
const list = () => {
    fs.readFile("./Data/notes.json", (err, data) => {
        var obj = JSON.parse(data);
        var keys = Object.keys(obj);
        console.log(chalk.black.bgBlueBright.bold("Your Notes:"))
        for (var i = 0; i < keys.length; i++) {
            console.log(obj[keys[i]].title);
        }
    });
}
const read = () => {
    fs.readFile('./Data/notes.json', (err, data) => {
        var obj = JSON.parse(data);
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            if (args.title === obj[keys[i]].title) {
                console.log(chalk.black.bgYellowBright.bold(args.title));
                console.log(obj[keys[i]].body);
            }
        }
    })
}
switch (process.argv[2]) {
    case "add":
        manageList("add");
        break;
    case "list":
        list();
        break;
    case "read":
        read();
        break;
    case "remove":
        manageList("remove");
        break;
    default:
        console.log(process.argv[2]  +" is an inValid Operation");
        console.log("Use the following operations");
        console.log("add - to add the note");
        console.log("list - to list the notes which is available");
        console.log("read - to read the description of single note");
        console.log("remove - to remove the note");
}
server.listen(port)