import * as t from 'tap'
import { RbDataProvider, errors } from '../src/index'

const { ERR_NOT_IMPLEMENTED } = errors

t.test('RbDataProvider', async t => {
  t.test('calling `getMany` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.getMany('test')
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `getOne` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.getOne('test', {})
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `createOne` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.createOne('test', {})
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `updateOne` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.updateOne('test', {})
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `updateMany` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.updateMany('test', {})
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `deleteOne` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.deleteOne('test', {})
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      )
    }
  })

  t.test('calling `deleteMany` on base class', async t => {
    const provider = new RbDataProvider()
    try {
      await provider.deleteMany(['test'], {})
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
