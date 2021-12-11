import humanizeString from 'humanize-string'
import {
  ERR_MISSING_RESOURCE_NAME,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE
} from './errors'
import { RbDataProvider } from './rbdataprovider'

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

function _mergeParams (a = {}, b = {}) {
  return {
    ...a,
    ...b,
    filters: {
      ...a.filters,
      ...b.filters
    }
  }
}

export class RbResource {
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
    relations,
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

    this.relations = new Map()
    if (relations) {
      for (const name in relations) {
        const relation = relations[name]
        this.addRelation(relation, name)
      }
    }

    this.ui = ui || {}
  }

  getKey (instance) {
    if (instance && this.key in instance) {
      return instance[this.key]
    }

    return null
  }

  async getMany (params = {}) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.getMany(this.path, _params)
  }

  async getOne (key, params = {}) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.getOne(this.path, key, _params)
  }

  async createOne (data, params = {}) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.createOne(this.path, data, _params)
  }

  async updateOne (key, data, params = {}) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.updateOne(this.path, key, data, _params)
  }

  async updateMany (data, params = {}) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.updateMany(this.path, data, _params)
  }

  async deleteOne (key, params) {
    const _params = _mergeParams(this.defaultParams, params)
    return this.provider.deleteOne(this.path, key, _params)
  }

  related (key, name) {
    if (!this.relations.has(name)) {
      return null
    }
    const relation = this.relations.get(name)
    return new RbResource({
      ...relation,
      path: `${this.path}/${key}/${relation.path}`
    })
  }

  addRelation (resource, name = null) {
    if (!(resource instanceof RbResource)) {
      throw new Error(ERR_INVALID_RESOURCE)
    }
    this.relations.set(name || resource.name, resource)
  }
}

export function createResource (opts) {
  return new RbResource(opts)
}

export default {
  RbResource,
  createResource
}
