import humanizeString from "humanize-string";
import {
  ERR_INVALID_RESOURCE,
  ERR_INVALID_RESOURCE_DATA_PROVIDER,
} from "./errors.js";
import { RbDataProvider } from "./rbdataprovider.js";

function _createJsonSchema(properties = {}) {
  return {
    type: "object",
    properties: {
      ...properties,
    },
  };
}

function _createUIConfig(opts) {
  const { formComponent, ...uiOpts } = opts;

  return {
    ...uiOpts,
    createFormComponent: uiOpts.createFormComponent || formComponent,
    updateFormComponent: uiOpts.updateFormComponent || formComponent,
  };
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
   * @param {Object} opts - The creation options
   * @param {String} opts.name - The unique resource name (e.g. "users")
   * @param {RbDataProvider} opts.provider - The data provider used to interact with the API
   * @param {String} [opts.key="id"] - The identifier attribute name
   * @param {String} [opts.path] - The resource base path (if different than name)
   * @param {String} [opts.label] - A human-readable description label for the resource (capitalized name if not specified)
   * @param {String} [opts.displayAttr] - The attribute used as representation of a single resource instance
   * @param {Function} [opts.stringify] - A function used to get a human-readable reperesentation of a single resource instance
   * @param {Object} [opts.schema] - The JSON schema representing the strcuture of resource instances
   * @param {Object} [opts.updateSchema] - The JSON schema used on update
   * @param {Object} [opts.createSchema] - The JSON schema used on creation
   * @param {Object} [opts.defaultParams] - Default params passed to the data provider when fetching the API (e.g. default filters)
   * @param {Boolean} [opts.isKeyEditable=false] - If true, allows editing the key of an instance
   * @param {Object} [opts.actions] - A map of actions executable on a single resource instance
   * @param {Array} [opts.listeners] - A list of callbacks to be called when the resource is marked as dirty
   * @param {Object} [opts.methods] - A dictionary of extra methods to extend the default resource API
   * @param {Object} [opts.ui] - An object containing UI-specific options and methods
   * @memberof RbResource
   */
  constructor({
    name,
    provider,
    key = "id",
    path = undefined,
    label = undefined,
    displayAttr = undefined,
    stringify = undefined,
    schema = undefined,
    updateSchema = undefined,
    createSchema = undefined,
    defaultParams = {},
    isKeyEditable = false,
    actions = {},
    listeners = [],
    methods = {},
    ui = {},
  }) {
    if (!(provider instanceof RbDataProvider)) {
      throw new Error(ERR_INVALID_RESOURCE_DATA_PROVIDER);
    }

    this.name = name;
    this.provider = provider;
    this.key = key;
    this.path = path || name;
    this.defaultParams = defaultParams;
    this.label = label || humanizeString(this.name);
    this.displayAttr = displayAttr || this.key;
    this.stringify =
      stringify || ((data) => data && `${data[this.displayAttr]}`);

    const _defaultSchema = _createJsonSchema({
      [this.key]: { type: "integer" },
    });
    const _schema = schema || updateSchema || createSchema || _defaultSchema;
    const _baseJsonSchema = JSON.parse(JSON.stringify(_schema));

    if (!isKeyEditable) {
      delete _baseJsonSchema.properties[this.key];
    }

    this.createSchema = createSchema || _baseJsonSchema;
    this.updateSchema = updateSchema || _baseJsonSchema;

    this.actions = actions || {};
    this.methods = methods || {};

    this.ui = _createUIConfig(ui || {});

    this.listeners = [...(listeners || [])];

    // Extend the base resource API with additional user-defined methods
    const funcs = Object.getOwnPropertyNames(this.methods).filter(
      (item) => typeof this.methods[item] === "function"
    );
    for (const funcName of funcs) {
      this[funcName] = (...args) => this.methods[funcName].call(this, ...args);
    }

    // This attribute is used to track the last write
    // operation on the resource (creation, update, deletion)
    // in order to refresh stale data.
    this.lastUpdate = null;
  }

  /**
   * Return the key of the given resource instance
   *
   * @param {Object} instance - The resource instance to get the key from
   * @return {Number|String|null} The key of the resource instance
   * @memberof RbResource
   */
  getKey(instance) {
    if (instance && this.key in instance) {
      return instance[this.key];
    }

    return null;
  }

  /**
   * Get a list of resource instances matching the given params
   *
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {String} [params.sort] - The attribute to sort queries for
   * @param {String} [params.order] - The order to sort queries for ('asc' or 'desc')
   * @param {Number} [params.offset] - The offset to start querying results from
   * @param {Number} [params.limit] - The maximum number of results to retrieve
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async getMany(params = {}) {
    const _params = this.mergeParams(params);
    return this.provider.getMany(this.path, _params);
  }

  /**
   * Get the resource instance matching the given key and params
   *
   * @param {Number|String} key - The resource instance key
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async getOne(key, params = {}) {
    const _params = this.mergeParams(params);
    return this.provider.getOne(this.path, key, _params);
  }

  /**
   * Store a new resource instance
   *
   * @param {Object} data - The resource instance attributes
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async createOne(data, params = {}) {
    const _params = this.mergeParams(params);
    const res = await this.provider.createOne(this.path, data, _params);
    this.setDirty();
    return res;
  }

  /**
   * Update an existing resource instance
   *
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} data - The resource instance attributes
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async updateOne(key, data, params = {}) {
    const _params = this.mergeParams(params);
    const res = await this.provider.updateOne(this.path, key, data, _params);
    this.setDirty();
    return res;
  }

  /**
   * Update several existing resource instances
   *
   * @param {Array} data - The list of resource instance datasets (including their identifier)
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async updateMany(data, params = {}) {
    const _params = this.mergeParams(params);
    const res = await this.provider.updateMany(this.path, data, _params);
    this.setDirty();
    return res;
  }

  /**
   * Delete an existing resource instance
   *
   * @param {Number|String} key - The resource instance identifier
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async deleteOne(key, params = {}) {
    const _params = this.mergeParams(params);
    const res = await this.provider.deleteOne(this.path, key, _params);
    this.setDirty();
    return res;
  }

  /**
   * Delete several existing resource instances
   *
   * @param {Array} keys - The list of identifiers of resource instances to be deleted
   * @param {Object} [params] - The (optional) query additional params
   * @param {Object} [params.filters] - The query filters
   * @param {AbortController} [params.abort] - The query abort controller
   * @return {Promise<Object>} The query response
   * @memberof RbResource
   */
  async deleteMany(keys, params = {}) {
    const _params = this.mergeParams(params);
    const res = await this.provider.deleteMany(this.path, keys, _params);
    this.setDirty();
    return res;
  }

  /**
   * Bind the given related resource to the given resource instance
   *
   * This method can be used to create a new relation resource between
   * a specific instance of the source resource and a sub-resource.
   *
   * e.g. users.getRelation(1, attachments) -> /users/1/attachments
   *
   * WARNING: related resources are NOT memoized, so calling this method
   * multiple times with the same arguments will create multiple instances
   * of the same related resource. This is by design, as it allows a better
   * control over the lifecycle of the related resource.
   *
   * @param {Number|String} key - The identifier of the resource instance
   * @param {RbResource} resource - The related resource
   * @param {Object} [opts] - The relation options
   * @param {Boolean} [opts.notifyParentOnDirty] - Should parent resource be notified when related becomes dirty
   * @return {RbResource} The new relation resource
   * @memberof RbResource
   */
  getRelation(key, resource, { notifyParentOnDirty = true } = {}) {
    if (!(resource instanceof RbResource)) {
      throw new Error(ERR_INVALID_RESOURCE);
    }
    const relation = new RbResource({
      ...resource,
      path: `${this.path}/${key}/${resource.path}`,
    });
    if (notifyParentOnDirty) {
      relation.addListener(this.setDirty.bind(this));
    }
    return relation;
  }

  /**
   * Get a dictionary of resource actions, where each action is bound to the resource
   *
   * @return {Object} The bound resource actions dictionary
   * @memberof RbResource
   */
  getActions() {
    return Object.fromEntries(
      Object.entries(this.actions).map(([key, action]) => {
        if (action.run) {
          const boundAction = {
            ...action,
            run: (...args) => action.run.call(this, ...args),
            isVisible:
              action.isVisible &&
              ((...args) => action.isVisible.call(this, ...args)),
          };
          return [key, boundAction];
        }
        return [key, (...args) => action.call(this, ...args)];
      })
    );
  }

  /**
   * Mark a resource as dirty and notify it to all its observers
   *
   * @memberof RbResource
   */
  setDirty() {
    this.lastUpdate = new Date();
    for (const listener of this.listeners) {
      listener(this.lastUpdate);
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
  addListener(callback) {
    if (typeof callback === "function") {
      this.listeners.push(callback);
    }
  }

  /**
   * Unregister an observer callback from this resource
   *
   * @param {Function} callback - The observer callback to unregister
   * @memberof RbResource
   */
  removeListener(callback) {
    const idx = this.listeners.indexOf(callback);
    this.listeners.splice(idx, 1);
  }

  /**
   * Merge th given params with resource default ones
   *
   * @param {Object} params - The params object to merge default ones with
   * @return {Object} The resulting merged params
   * @memberof RbResource
   */
  mergeParams(params = {}) {
    return {
      ...this.defaultParams,
      ...params,
      filters: {
        ...this.defaultParams.filters,
        ...params.filters,
      },
    };
  }
}

/**
 * Create a new RbResource instance
 *
 * @export
 * @param {Object} opts - The resource options
 * @return {RbResource} The created resource
 */
export function createResource(opts) {
  return new RbResource(opts);
}

export default {
  RbResource,
  createResource,
};
