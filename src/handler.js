const {nanoid} = require("nanoid");
const notes = require('./notes')

function addNoteHandler(request, h) {
    const {title, tags, body} = request.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt
    }

    notes.push(newNote)

    const isSuccess = notes.filter(note => note.id === id).length > 0

    if(isSuccess === true) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })

        response.code = 201
        return response
    }

    const response = h.response({
        status: 'failed',
        message: 'Catatan gagal ditambahkan',
    })

    response.code = 500
    return response
}

function getAllNotesHandler(request, h) {
    return {
        status: 'success',
        data: {
            notes
        }
    }
}

function getSingleNoteHandler(request, h) {
    const {id} = request.params
    const note = notes.filter(note => note.id === id)[0]

    if(note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            }
        }
    }


    return {
        code: 404,
        status: 'fail',
        messasge: 'catatan tidak ditemukan',
    }
}

function editNoteHandler(request, h){

    const {id} = request.params
    const {title, tags, body} = request.payload
    const updatedAt = new Date().toISOString()

    const oldNoteIndex = notes.findIndex(note => note.id === id)

    if (oldNoteIndex === -1){
        return {
            code: 400,
            status: 'fail',
            message: 'note tidak ditemukan'
        }
    }

    notes[oldNoteIndex] = {
        ...notes[oldNoteIndex],
        title,
        tags,
        body,
        updatedAt
    }


    return {
        status: 'success',
        message: 'note berhasil diperbaharui',
    }
}

function deleteNoteHandler(request, h) {
    const {id} = request.params

    const index = notes.findIndex(note => note.id === id)

    if(index === -1) {
        return {
            code: 400,
            status: 'fail',
            message: 'note tidak ditemukan'
        }
    }

    notes.splice(index, 1)
    return {
        status: 'success',
        message: 'note berhasil diperbaharui',
    }
}


module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getSingleNoteHandler,
    editNoteHandler,
    deleteNoteHandler
}
