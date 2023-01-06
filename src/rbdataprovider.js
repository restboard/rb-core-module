import { ERR_NOT_IMPLEMENTED } from './errors.js'

/**
 * The base class for data providers
 *
 * @export
 * @class RbDataProvider
 */
export class RbDataProvider {
  /**
   * Get a list of resource instances matching the given params
   *
   * @param {String} resourcePath - The resource path to get the list of instances from
   * @param {Object} params { filters = {}, sort = '', order = '', offset = 0, limit = null } - The query input params
   * @return {Object} The query response
   * @memberof RbDataProvider
   */
  async getMany (
    resourcePath,
    params = { filters = {}, sort = '', order = '', offset = 0, limit = null } = {}
  ) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Get the resource instance matching the given key and params
   *
   * @param {String} resourcePath - The resource path to get the instance from
   * @param {Number|String} key - The resource instance key
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async getOne (resourcePath, key, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Store a new resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be stored
   * @param {Object} data - The resource instance attributes
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async createOne (resourcePath, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Update an existing resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be updated
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} data - The resource instance attributes
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async updateOne (resourcePath, key, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Update several existing resource instances
   *
   * @param {String} resourcePath - The resource path associated to the instances to be updated
   * @param {Array} data - The list of resource instance datasets (including their identifier)
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async updateMany (resourcePath, data, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Delete an existing resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be deleted
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async deleteOne (resourcePath, key, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }

  /**
   * Delete several existing resource instances
   *
   * @param {String} resourcePath - The resource path associated to the instances to be deleted
   * @param {Array} keys - The list of identifiers of resource instances to be deleted
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async deleteMany (resourcePath, keys, params = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED)
  }
}

export default {
  RbDataProvider
}
