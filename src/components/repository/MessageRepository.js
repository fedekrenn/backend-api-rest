const { loggerError } = require('../../utils/logger')
const { handleMessages } = require('../../components/factory/Factory')

class MessageRepository {
  async save(msg) {
    try {
      return await handleMessages.save(msg)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getAll() {
    try {
      return await handleMessages.getAll()
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = MessageRepository
