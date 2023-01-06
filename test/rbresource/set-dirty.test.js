import t from 'tap'
import { RbDataProvider } from '../../src/rbdataprovider.js'
import { createResource } from '../../src/rbresource.js'

const opts = {
  name: 'test',
  provider: new RbDataProvider()
}

t.test('setDirty', async t => {
  t.test('creating a resource', async t => {
    try {
      const resource = createResource(opts)
      t.equal(
        resource.lastUpdate,
        null,
        'should have initialize lastUpdate to null'
      )
      t.same(
        resource.listeners,
        [],
        'should have initialize listeners to an empty array'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('calling setDirty', async t => {
    try {
      const resource = createResource(opts)
      resource.setDirty()
      t.not(
        resource.lastUpdate,
        null,
        'should have set lastUpdate to the current timestamp'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('calling setDirty', async t => {
    try {
      let isDirty = false
      const resource = createResource(opts)
      resource.addListener(() => isDirty = true)
      resource.setDirty()
      t.ok(
        isDirty,
        'should trigger all registered listeners'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })
})
