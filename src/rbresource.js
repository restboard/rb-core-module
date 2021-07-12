import humanizeString from 'humanize-string'
import {
  ERR_MISSING_RESOURCE_NAME,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE_DATA_PROVIDER
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

function _columnsFromSchema (schema = {}) {
  const props = schema.properties || {}
  return Object.keys(props).map((name) => ({
    name,
    ...props[name]
  }))
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
    columns,
    defaultParams,
    isKeyEditable,
    relations
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
    this.stringify = stringify || (data => data && `${data[this.displayAttr || this.key]}`)

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

    this.columns = columns || _columnsFromSchema(_schema)
    this.relations = relations || new Map()
  }

  async getMany (params = {}) {
    return this.provider.getMany(this.path, {
      ...this.defaultParams,
      ...params,
      filters: {
        ...this.defaultParams.filters,
        ...params.filters
      }
    })
  }

  async getOne ({ id }) {
    return this.provider.getOne(this.path, { id })
  }

  async createOne (data) {
    return this.provider.createOne(this.path, data)
  }

  async updateOne ({ id, ...data }) {
    return this.provider.updateOne(this.path, { id, ...data })
  }

  async updateMany (data) {
    return this.provider.updateMany(this.path, data)
  }

  async deleteOne ({ id }) {
    return this.provider.deleteOne(this.path, { id })
  }

  related (id, name) {
    if (!(name in this.relations)) {
      return null
    }
    const {
      path,
      provider,
      key,
      label,
      displayAttr,
      stringify,
      updateSchema,
      createSchema,
      columns,
      defaultParams,
      isKeyEditable,
      relations
    } = this.relations[name]
    return new RbResource({
      name,
      path: `${this.path}/${id}/${path}`,
      provider,
      key,
      label,
      displayAttr,
      stringify,
      updateSchema,
      createSchema,
      columns,
      defaultParams,
      isKeyEditable,
      relations
    })
  }
}

export function createResource (opts) {
  return new RbResource(opts)
}

export default {
  createResource
}
