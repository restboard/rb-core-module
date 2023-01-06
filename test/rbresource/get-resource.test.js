import t from 'tap'
import { RbDataProvider } from '../../src/rbdataprovider.js'
import { createResource } from '../../src/rbresource.js'

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
