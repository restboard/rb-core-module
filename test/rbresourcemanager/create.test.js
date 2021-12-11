import * as t from 'tap'
import {
  createResourceManager,
  createResource,
  RbResourceManager,
  RbDataProvider
} from '../../src/index'

const testDataProvider = new RbDataProvider()

const testResources = [
  createResource({
    name: 'test1',
    provider: testDataProvider
  }),
  createResource({
    name: 'test2',
    provider: testDataProvider
  })
]

t.test('createResourceManager', async t => {
  t.test(
    'creating a resource manager without passing any resource',
    async t => {
      try {
        const mng = createResourceManager()
        t.equal(
          mng instanceof RbResourceManager,
          true,
          'should have created a valid resource manager'
        )
        t.same(
          mng.getAllResources(),
          [],
          'should not contain any registered resource'
        )
      } catch (err) {
        console.error(err)
        t.error(err, 'should not throw any error')
      }
    }
  )

  t.test('creating a resource manager passing a resource list', async t => {
    try {
      const mng = createResourceManager(testResources)
      t.equal(
        mng instanceof RbResourceManager,
        true,
        'should have created a valid resource manager'
      )
      t.same(
        mng.getAllResources(),
        testResources,
        'should contain the given resources'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })
})
