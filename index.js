import humanizeString from 'humanize-string'

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
  return Object.keys(props).map(name => ({
    name,
    ...props[name]
  }))
}

export const errors = {
  ERR_NOT_IMPLEMENTED: 'RB_ERR_NOT_IMPLEMENTED',
  ERR_MISSING_RESOURCE_NAME: 'RB_ERR_MISSING_RESOURCE_NAME',
  ERR_MISSING_RESOURCE_DATA_PROVIDER: 'ERR_MISSING_RESOURCE_DATA_PROVIDER',
  ERR_INVALID_RESOURCE_DATA_PROVIDER: 'ERR_INVALID_RESOURCE_DATA_PROVIDER'
}

export class RbDataProvider {
  async getMany (resource, params) {
    throw new Error(errors.ERR_NOT_IMPLEMENTED)
  }

  async getOne (resource, { id }) {
    throw new Error(errors.ERR_NOT_IMPLEMENTED)
  }

  async createOne (resource, data) {
    throw new Error(errors.ERR_NOT_IMPLEMENTED)
  }

  async updateOne (resource, { id, ...data }) {
    throw new Error(errors.ERR_NOT_IMPLEMENTED)
  }

  async deleteOne (resource, { id }) {
    throw new Error(errors.ERR_NOT_IMPLEMENTED)
  }
}

export class RbResource {
  constructor (opts = {}) {
    if (!opts.name) {
      throw new Error(errors.ERR_MISSING_RESOURCE_NAME)
    }
    if (!opts.provider) {
      throw new Error(errors.ERR_MISSING_RESOURCE_DATA_PROVIDER)
    }
    if (!(opts.provider instanceof RbDataProvider)) {
      throw new Error(errors.ERR_INVALID_RESOURCE_DATA_PROVIDER)
    }

    this.name = opts.name
    this.provider = opts.provider

    this.key = opts.key || 'id'
    this.label = opts.label || humanizeString(this.name)

    const _baseJsonSchema = _createJsonSchema()
    const _defaultSchema = _createJsonSchema({
      [this.key]: { type: 'integer' }
    })
    const _schema = opts.schema || opts.updateSchema || opts.createSchema || _defaultSchema
    this.createSchema = opts.createSchema || opts.schema || _baseJsonSchema
    this.updateSchema = opts.updateSchema || opts.schema || _baseJsonSchema
    this.columns = opts.columns || _columnsFromSchema(_schema)
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
  errors,
  RbDataProvider,
  createResource
}
