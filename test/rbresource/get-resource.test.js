import * as t from 'tap'
import { createResource, errors, RbDataProvider } from '../../src/index'

const {
  ERR_MISSING_RESOURCE_NAME,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE_DATA_PROVIDER
} = errors

t.test('getRelation', async t => {

  t.test('getting a resource relation', async t => {
    const tags = createResource({
      name: 'tags',
      provider: new RbDataProvider(),
      listeners: [
        () => {}
      ]
    })
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      const relatedResource = resource.getRelation(1, tags)
      t.equal(
        relatedResource.name,
        'tags',
        'should keep all related resource attributes'
      )
      t.same(
        relatedResource.path,
        'test/1/tags',
        'should use the correct related resource endpoint'
      )
      t.equal(
        relatedResource.listeners.length,
        2,
        'should keep all related resource listeners plus one to the parent resource'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })
})
