import * as t from 'tap'
import { RbStorage, errors } from '../src/index'

const { ERR_NOT_IMPLEMENTED } = errors

t.test('RbStorage', async (t) => {
  t.test('calling `getItem` on base class', async (t) => {
    const storage = new RbStorage()
    try {
      await storage.getItem('test')
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `setItem` on base class', async (t) => {
    const storage = new RbStorage()
    try {
      await storage.setItem('test', 1)
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `removeItem` on base class', async (t) => {
    const storage = new RbStorage()
    try {
      await storage.removeItem('test')
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `isItemPersistent` on base class', async (t) => {
    const storage = new RbStorage()
    try {
      await storage.isItemPersistent('test')
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })
})
