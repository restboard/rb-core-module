import humanizeString from 'humanize-string'
import {
  ERR_INVALID_RESOURCE,
  ERR_INVALID_RESOURCE_DATA_PROVIDER,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_MISSING_RESOURCE_NAME
} from './errors.js'
import { RbDataProvider } from './rbdataprovider.js'

function _createJsonSchema (properties = {}) {
  return {
    type: 'object',
    properties: {
      ...properties
    }
  }
}

function _bindActionsToResource (actions, resource) {
  if (!actions) {
    return actions
  }
  for (const actionName in actions) {
    const action = actions[actionName]
    if (action.run) {
      actions[actionName].run = action.run.bind(resource)
    } else {
      actions[actionName] = action.bind(resource)
    }
  }
  return actions
}

function _createUIConfig (opts) {
  const { formComponent, ...uiOpts } = opts

  return {
    ...uiOpts,
    createFormComponent: uiOpts.createFormComponent || formComponent,
    updateFormComponent: uiOpts.updateFormComponent || formComponent
  }
}

/**
 * A resource exposed by an API
 *
 * @export
 * @class RbResource
 */
export class RbResource {
  /**
   * Creates an instance of RbResource
   * 
   * @param {Object} {
   *     name,
   *     path,
   *     provider,
   *     key,
   *     label,
   *     displayAttr,
   *     stringify,
   *     schema,
   *     updateSchema,
   *     createSchema,
   *     defaultParams,
   *     isKeyEditable,
   *     actions,
   *     listeners,
   *     ui
   *   } - The creation options
   * @memberof RbResource
   */
  constructor ({
    name,
    path,
    provider,
    key,
    label,
    displayAttr,
    stringify,
    schema,
    updateSchema,
    createSchema,
    defaultParams,
    isKeyEditable,
    actions,
    listeners,
    ui
  } = {}) {
    if (!name) {
      throw new Error(ERR_MISSING_RESOURCE_NAME)
    }
    if (!provider) {
      throw new Error(ERR_MISSING_RESOURCE_DATA_PROVIDER)
    }
    if (!(provider instanceof RbDataProvider)) {
      throw new Error(ERR_INVALID_RESOURCE_DATA_PROVIDER)
    }

    this.name = name
    this.path = path || name
    this.defaultParams = defaultParams || {}
    this.provider = provider

    this.key = key || 'id'
    this.label = label || humanizeString(this.name)
    this.displayAttr = displayAttr
    this.stringify =
      stringify || (data => data && `${data[this.displayAttr || this.key]}`)

    const _defaultSchema = _createJsonSchema({
      [this.key]: { type: 'integer' }
    })
    const _schema = schema || updateSchema || createSchema || _defaultSchema

    const _baseJsonSchema = JSON.parse(JSON.stringify(_schema))

    if (!isKeyEditable) {
      delete _baseJsonSchema.properties[this.key]
    }

    this.createSchema = createSchema || _baseJsonSchema
    this.updateSchema = updateSchema || _baseJsonSchema

    this.actions = _bindActionsToResource(actions || {}, this)

    this.ui = _createUIConfig(ui || {})

    this.listeners = [...listeners || []]

    // This attribute is used to track the last write
    // operation on the resource (creation, update, deletion)
    // in order to refresh stale data.
    this.lastUpdate = null
  }

  /**
   * Return the key of the given resource instance
   *
   * @param {Object} instance - The resource instance to get the key from
   * @return {Number|String|null} The key of the resource instance
   * @memberof RbResource
   */
  getKey (instance) {
    if (instance && this.key in instance) {
      return instance[this.key]
    }

    return null
  }

  /**
   * Get a list of resource instances matching the given params
   *
   * @param {Object} params { filters = {}, sort = '', order = '', offset = 0, limit = null } - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async getMany (params = {
    filters: {},
    sort: '',
    order: '',
    offset: 0,
    limit: null
  }) {
    const _params = this.mergeParams(params)
    return this.provider.getMany(this.path, _params)
  }

  /**
   * Get the resource instance matching the given key and params
   *
   * @param {Number|String} key - The resource instance key
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async getOne (key, params = {}) {
    const _params = this.mergeParams(params)
    return this.provider.getOne(this.path, key, _params)
  }

  /**
   * Store a new resource instance
   *
   * @param {Object} data - The resource instance attributes
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async createOne (data, params = {}) {
    const _params = this.mergeParams(params)
    const res = await this.provider.createOne(this.path, data, _params)
    this.setDirty()
    return res
  }

  /**
   * Update an existing resource instance
   *
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} data - The resource instance attributes
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async updateOne (key, data, params = {}) {
    const _params = this.mergeParams(params)
    const res = await this.provider.updateOne(this.path, key, data, _params)
    this.setDirty()
    return res
  }

  /**
   * Update several existing resource instances
   *
   * @param {Array} data - The list of resource instance datasets (including their identifier)
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async updateMany (data, params = {}) {
    const _params = this.mergeParams(params)
    const res = await this.provider.updateMany(this.path, data, _params)
    this.setDirty()
    return res
  }

  /**
   * Delete an existing resource instance
   *
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async deleteOne (key, params = {}) {
    const _params = this.mergeParams(params)
    const res = await this.provider.deleteOne(this.path, key, _params)
    this.setDirty()
    return res
  }

  /**
   * Delete several existing resource instances
   *
   * @param {Array} keys - The list of identifiers of resource instances to be deleted
   * @param {Object} params - The query input params
   * @return {Object} The query response
   * @memberof RbResource
   */
  async deleteMany (keys, params = {}) {
    const _params = this.mergeParams(params)
    const res = await this.provider.deleteMany(this.path, keys, _params)
    this.setDirty()
    return res
  }

  /**
   * Bind the given related resource to the given resource instance
   * 
   * This method can be used to create a new relation resource between
   * a specific instance of the source resource and a sub-resource.
   * 
   * e.g. users.getRelation(1, attachments) -> /users/1/attachments
   *
   * @param {Number|String} key - The identifier of the resource instance
   * @param {RbResource} resource - The related resource
   * @param {Object} [{ notifyParentOnDirty = true }={}] - The relation options
   * @return {RbResource} The new relation resource
   * @memberof RbResource
   */
  getRelation (key, resource, { notifyParentOnDirty = true } = {}) {
    if (!(resource instanceof RbResource)) {
      throw new Error(ERR_INVALID_RESOURCE)
    }
    const relation = new RbResource({
      ...resource,
      path: `${this.path}/${key}/${resource.path}`
    })
    if (notifyParentOnDirty) {
      relation.addListener(this.setDirty)
    }
    return relation
  }

  /**
   * Mark a resource as dirty and notify it to all its observers
   *
   * @memberof RbResource
   */
  setDirty () {
    this.lastUpdate = new Date()
    for (const listener of this.listeners) {
      listener(this.lastUpdate)
    }
  }

  /**
   * Register a new observer callback for this resource
   * 
   * The callback should implement the following signature:
   * 
   * (lastUpdate) => {}
   *
   * @param {Function} callback - The observer callback to register
   * @memberof RbResource
   */
  addListener (callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback)
    }
  }

  /**
   * Unregister an observer callback from this resource
   *
   * @param {Function} callback - The observer callback to unregister
   * @memberof RbResource
   */
  removeListener (callback) {
    const idx = this.listeners.indexOf(callback)
    this.listeners.splice(idx, 1)
  }

  /**
   * Merge th given params with resource default ones
   *
   * @param {Object} params - The params object to merge default ones with
   * @return {Object} The resulting merged params
   * @memberof RbResource
   */
  mergeParams (params = {}) {
    return {
      ...this.defaultParams,
      ...params,
      filters: {
        ...this.defaultParams.filters,
        ...params.filters
      }
    }
  }
}

/**
 * Create a new RbResource instance
 *
 * @export
 * @param {Object} opts - The resource options
 * @return {RbResource} The created resource 
 */
export function createResource (opts) {
  return new RbResource(opts)
}

export default {
  RbResource,
  createResource
}
