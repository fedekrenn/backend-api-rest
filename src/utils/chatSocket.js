const MessageRepository =
  require('../components/repository/MessageRepository')
const handleMsg = new MessageRepository()

/* ------ Socket.io ------ */

const listen = (io) => {
  io.on('connection', async (socket) => {
    console.log('Se conectó un nuevo cliente')

    // Mensajes
    socket.emit('mensajes', await handleMsg.getAll())

    socket.on('new-message', async (msj) => {
      await handleMsg.save(msj)
      io.sockets.emit('mensajes', await handleMsg.getAll())
    })
  })
}

module.exports = { listen }
