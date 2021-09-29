# Command Line Note Taking App

### It performs four Operations

- add - to add the note
- list - to list all the notes which is available
- read - to read the description of single note
- remove - to remove the note


## :point_down:Steps to initialize the project:

- Clone the repository
```
$ git clone
```
- Redirect to the cloned repo directory

- Install the dependencies
```
npm install
```
###  Open up the terminal for doing the following operations

- If you want to add the note, use
```
node app.js add --title="titleName" --body="titleDescription"
```
- If you want the list all the notes, use
```
node app.js list 
```
- If you want to read the description of particular note, use
```
node app.js read --title="titleName" 
```
- If you want to remove the note, use
```
node app.js remove --title="titleName"
```
