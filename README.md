# LAB - Class 01 - 04

## Notes

### Author: Joel Watson

### Links and Resources

- [submission PR (lab-01)](https://github.com/401-advanced-javascript-joel/notes/pull/1)
- [submission PR (lab-02)](https://github.com/401-advanced-javascript-joel/notes/pull/2)
- [submission PR (lab-03)](https://github.com/401-advanced-javascript-joel/notes/pull/3)
- [submission PR (lab-04)](https://github.com/401-advanced-javascript-joel/notes/pull/4)
- [ci/cd (lab-01)](https://github.com/401-advanced-javascript-joel/notes/runs/518200179) 
- [ci/cd (lab-02)](https://github.com/401-advanced-javascript-joel/notes/runs/523368933) 
- [ci/cd (lab-03)](https://github.com/401-advanced-javascript-joel/notes/runs/532289891)
- [ci/cd (lab-04)](https://github.com/401-advanced-javascript-joel/notes/runs/542401133)
- [NPM](https://www.npmjs.com/package/@fellowjoel/notes)

### Setup

- `npm install`

#### How to run

Example of adding a note to the database (must use -a or --add)

- `notes --add "Hello, I am an example note"`
- `notes --add "Hello, I am an example note" --categories "school, examples" // categories optional`

Example of listing the notes from the database (must use -l or --list)

- `notes --list // gets all notes`
- `notes --list school // gets notes with "school" category`

Example of updating a note in the database (must use -u or --update)

- `notes --update <note-uuid> --note "I've been updated" --categories "school, examples" // replace note-uuid with actual uuid from mongo`

Example of adding a note to the database (must use -d or --delete)

- `notes --delete <note-uuid>` 

#### Tests

- `npm test`

#### UML
lab-01
![UML01](https://raw.githubusercontent.com/JoelMWatson/data-structures-and-algorithms/master/assets/notes.jpg)

lab-02
![UML02](https://raw.githubusercontent.com/JoelMWatson/data-structures-and-algorithms/master/assets/classes.jpg)

lab-03
![UML03](https://raw.githubusercontent.com/JoelMWatson/data-structures-and-algorithms/master/assets/mongo.jpg)

lab-04
![UML04](https://raw.githubusercontent.com/JoelMWatson/data-structures-and-algorithms/master/assets/lab-04-uml.jpg)
