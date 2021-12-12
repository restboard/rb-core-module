import * as t from 'tap'
import { createResource, RbDataProvider } from '../../src/index'

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
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('calling setDirty will update lastUpdate', async t => {
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
})
