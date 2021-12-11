import { ERR_INVALID_RESOURCE, ERR_INVALID_RESOURCE_NAME } from './errors'
import { RbResource, createResource } from './rbresource'

export class RbResourceManager {
  constructor (resources = []) {
    this.resources = new Map()
    for (const resource of resources) {
      this.registerResource(resource)
    }
  }

  createResource (opts) {
    const resource = createResource(opts)
    this.registerResource(resource)
    return resource
  }

  registerResource (resource) {
    if (resource && resource instanceof RbResource) {
      this.resources.set(resource.name, resource)
    } else {
      throw new Error(ERR_INVALID_RESOURCE)
    }
  }

  getAllResources () {
    return this.resources.values()
  }

  getResourceByName (name) {
    if (this.resources.has(name)) {
      return this.resources.get(name)
    }
    throw new Error(ERR_INVALID_RESOURCE_NAME)
  }

  getAllResourceNames () {
    return this.resources.keys()
  }
}

export function createResourceManager (resources = []) {
  return new RbResourceManager(resources)
}

export default {
  RbResourceManager,
  createResourceManager
}
