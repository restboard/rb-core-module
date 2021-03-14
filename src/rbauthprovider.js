import { ERR_NOT_IMPLEMENTED } from "./errors";

export class RbAuthProvider {
  async login(credentials) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async logout() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async checkAuth() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async getIdentity(user) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async can(user, route) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }
}

export default {
  RbAuthProvider,
};
