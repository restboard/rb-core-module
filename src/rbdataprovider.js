import { ERR_NOT_IMPLEMENTED } from "./errors";

export class RbDataProvider {
  async getMany(resource, params) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async getOne(resource, { id }) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async createOne(resource, data) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async updateOne(resource, { id, ...data }) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  async deleteOne(resource, { id }) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }
}

export default {
  RbDataProvider,
};
