import { ERR_NOT_IMPLEMENTED } from './errors.js'

export class RbAuthProvider {
  async login (credentials) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async logout () {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async checkAuth () {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async getIdentity (user) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async getTenantIdentity (user) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  async can (user, action, subject = null) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }
}

export default {
  RbAuthProvider
}
