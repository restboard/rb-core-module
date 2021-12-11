import { ERR_NOT_IMPLEMENTED } from './errors'

export class RbDataProvider {
  async getMany (
    resourcePath,
    { filters = {}, sort = '', order = '', offset = 0, limit = null } = {}
  ) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async getOne (resourcePath, key, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async createOne (resourcePath, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async updateOne (resourcePath, key, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async updateMany (resourcePath, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async deleteOne (resourcePath, key, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }
}

export default {
  RbDataProvider
}
