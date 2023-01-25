import t from 'tap'
import { RbDataProvider } from '../../src/rbdataprovider.js'
import { createResource } from '../../src/rbresource.js'

t.test('executeAction', async t => {
  t.test('executing a function', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      actions: {
        foo () {
          return this
        }
      }
    }
    try {
      const resource = createResource(opts)
      const fooRes = resource.executeAction(resource.actions.foo)
      t.equal(
        fooRes,
        resource,
        'should have bound the resource as `this` of the action'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('executing an action object', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      actions: {
        bar: {
            run () {
                return this
            }
        }
      }
    }
    try {
      const resource = createResource(opts)
      const barRes = resource.executeAction(resource.actions.bar)
      t.equal(
        barRes,
        resource,
        'should have bound the resource as `this` of the action'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })
})
