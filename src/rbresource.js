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
  constructor (opts = {}) {
    if (!opts.name) {
      throw new Error(ERR_MISSING_RESOURCE_NAME)
    }
    if (!opts.provider) {
      throw new Error(ERR_MISSING_RESOURCE_DATA_PROVIDER)
    }
    if (!(opts.provider instanceof RbDataProvider)) {
      throw new Error(ERR_INVALID_RESOURCE_DATA_PROVIDER)
    }

    const {
      name,
      provider,
      key,
      label,
      icon,
      displayAttr,
      stringify,
      schema,
      updateSchema,
      createSchema,
      columns,
      isKeyEditable
    } = opts

    this.name = name
    this.provider = provider

    this.key = key || 'id'
    this.label = label || humanizeString(this.name)
    this.icon = icon
    this.displayAttr = displayAttr
    this.stringify = stringify || (data => `${data[this.displayAttr || this.key]}`)

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
  }

  async getMany (params) {
    return this.provider.getMany(this.name, params)
  }

  async getOne ({ id }) {
    return this.provider.getOne(this.name, { id })
  }

  async createOne (data) {
    return this.provider.createOne(this.name, data)
  }

  async updateOne ({ id, ...data }) {
    return this.provider.createOne(this.name, { id, ...data })
  }

  async deleteOne ({ id }) {
    return this.provider.deleteOne(this.name, { id })
  }
}

export function createResource (opts) {
  return new RbResource(opts)
}

export default {
  createResource
}
