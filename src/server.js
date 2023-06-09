require('dotenv').config()
const Hapi = require('@hapi/hapi')
const notes = require('./api/notes')
const NotesService = require('./services/postgre/NotesService')
const NoteValidator = require('./validator/index')

const init = async ()=> {

    const notesService = new NotesService()


    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });


    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NoteValidator
        }
    })

    await server.start()
    console.log(`Server berjalan ${server.info.uri}`)
}


init()
