const { loggerError } = require('../../../utils/logger')

let instance = null

class MessageFirebase {
  async save(msg) {
    console.log('FuncaGuardar')
  }

  async getAll() {
    console.log('Funca Leer')
  }

  static getInstance() {
    if (!instance) {
      instance = new MessageFirebase()
    }
    return instance
  }
}

module.exports = MessageFirebase
