import { ERR_NOT_IMPLEMENTED } from "./errors.js";

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
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {String} [params.sort] - The attribute to sort queries for
   * @param {String} [params.order] - The order to sort queries for ('asc' or 'desc')
   * @param {Number} [params.offset] - The offset to start querying results from
   * @param {Number} [params.limit] - The maximum number of results to retrieve
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbDataProvider
   */
  async getMany(
    resourcePath,
    {
      filters = {},
      sort = "",
      order = "",
      offset = 0,
      limit = null,
      abort = null,
    } = {}
  ) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Get the resource instance matching the given key and params
   *
   * @param {String} resourcePath - The resource path to get the instance from
   * @param {Number|String} key - The resource instance key
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async getOne(resourcePath, key, { filters = {}, abort = null } = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Store a new resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be stored
   * @param {Object} data - The resource instance attributes
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async createOne(resourcePath, data, { filters = {}, abort = null } = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Update an existing resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be updated
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} data - The resource instance attributes
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async updateOne(
    resourcePath,
    key,
    data,
    { filters = {}, abort = null } = {}
  ) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Update several existing resource instances
   *
   * @param {String} resourcePath - The resource path associated to the instances to be updated
   * @param {Array} data - The list of resource instance datasets (including their identifier)
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async updateMany(resourcePath, data, { filters = {}, abort = null } = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Delete an existing resource instance
   *
   * @param {String} resourcePath - The resource path associated to the instance to be deleted
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async deleteOne(resourcePath, key, { filters = {}, abort = null } = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Delete several existing resource instances
   *
   * @param {String} resourcePath - The resource path associated to the instances to be deleted
   * @param {Array} keys - The list of identifiers of resource instances to be deleted
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async deleteMany(resourcePath, keys, { filters = {}, abort = null } = {}) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }
}

export default {
  RbDataProvider,
};
