import * as humanize from 'humanize-string'

const errors = {
  ERR_NOT_IMPLEMENTED: 'RB_ERR_NOT_IMPLEMENTED',
  ERR_MISSING_RESOURCE_NAME: 'RB_ERR_MISSING_RESOURCE_NAME',
  ERR_MISSING_RESOURCE_PROVIDER: 'RB_ERR_MISSING_RESOURCE_PROVIDER'
}

function _columnsFromSchema (schema = {}) {
  const props = schema.properties || {}
  return Object.keys(props).map(name => props[name])
}

class RbDataProvider {
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

class RbResource {
  constructor (opts = {}) {
    if (!opts.name) {
      throw new Error(errors.ERR_MISSING_RESOURCE_NAME)
    }
    if (!opts.provider) {
      throw new Error(errors.ERR_MISSING_RESOURCE_PROVIDER)
    }

    this.name = opts.name
    this.provider = opts.provider

    this.id = opts.id || 'id'
    this.label = opts.label || humanize(this.name)
    this.createSchema = opts.createSchema || opts.schema || {}
    this.updateSchema = opts.updateSchema || opts.schema || {}

    const _schema = opts.schema || opts.updateSchema || opts.createSchema
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

function createResource (opts) {
  return new RbResource(opts)
}

export default {
  errors,
  RbDataProvider,
  createResource
}
