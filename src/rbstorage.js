import { ERR_NOT_IMPLEMENTED } from './errors'

export class RbStorage {
  async getItem (key) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async setItem (key, val, persistent) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async removeItem (key) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async isItemPersistent (key) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }
}

export default {
  RbStorage
}
