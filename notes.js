const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    //console.log('Title to be removed: ', title)
    const notes = loadNotes()

    modifiedNotes = notes.filter((element) => element.title !== title)

    if (modifiedNotes.length != notes.length) {
        saveNotes(modifiedNotes)
        console.log(chalk.green('Note removed.'))
    } else {
        console.log(chalk.red('Note not found!'))
    }
    
}

const listNotes = () => {
    console.log(chalk.green("Your notes"))
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(element.title)    
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note) {
        console.log(chalk.green.inverse(note.title), chalk.green(note.body))       
    } else {
        console.log(chalk.red.inverse('Error! No note found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}