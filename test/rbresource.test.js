import * as t from 'tap'
import { createResource, errors, RbDataProvider } from '../src/index'

const {
  ERR_MISSING_RESOURCE_NAME,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE_DATA_PROVIDER
} = errors

t.test('createResource', async t => {
  t.test('creating a resource without passing resource name', async t => {
    try {
      createResource()
      t.fail(`should throw ${ERR_MISSING_RESOURCE_NAME}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_MISSING_RESOURCE_NAME,
        `should throw ${ERR_MISSING_RESOURCE_NAME}`
      )
    }
  })

  t.test('creating a resource without passing a data provider', async t => {
    const opts = {
      name: 'test'
    }
    try {
      createResource(opts)
      t.fail(`should throw ${ERR_MISSING_RESOURCE_DATA_PROVIDER}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_MISSING_RESOURCE_DATA_PROVIDER,
        `should throw ${ERR_MISSING_RESOURCE_DATA_PROVIDER}`
      )
    }
  })

  t.test('creating a resource passing an invalid data provider', async t => {
    const opts = {
      name: 'test',
      provider: {}
    }
    try {
      createResource(opts)
      t.fail(`should throw ${ERR_INVALID_RESOURCE_DATA_PROVIDER}`)
    } catch (err) {
      t.equal(
        err.message,
        ERR_INVALID_RESOURCE_DATA_PROVIDER,
        `should throw ${ERR_INVALID_RESOURCE_DATA_PROVIDER}`
      )
    }
  })

  t.test('creating a resource passing a valid data provider', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.equal(
        resource.name,
        opts.name,
        'should set resource.name to the value of the passed "name" option'
      )
      t.equal(
        resource.provider,
        opts.provider,
        'should set resource.provider to the value of the passed "provider" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing a "path" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.equal(
        resource.path,
        opts.name,
        'should assign the passed "name" option as "path"'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "path" option', async t => {
    const opts = {
      name: 'test',
      path: 'products',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.equal(resource.path, opts.path, 'should use the passed "path" option')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing a "key"', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.equal(resource.key, 'id', 'should set resource.key = "id"')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "key" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      key: 'myId'
    }
    try {
      const resource = createResource(opts)
      t.equal(
        resource.key,
        opts.key,
        'should set resource.key to the value of the passed "key" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing a "label" option', async t => {
    const opts = {
      name: 'test_resource',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.equal(
        resource.label,
        'Test resource',
        'should set resource.label with a human-readable version of resource name'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "label" option', async t => {
    const opts = {
      name: 'test_resource',
      provider: new RbDataProvider(),
      label: 'Tests'
    }
    try {
      const resource = createResource(opts)
      t.equal(
        resource.label,
        opts.label,
        'should set resource.label to the value of the passed "label" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing any schema', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    const emptyJsonSchema = {
      type: 'object',
      properties: {}
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.createSchema,
        emptyJsonSchema,
        'should set resource.createSchema to an empty JSON schema'
      )
      t.same(
        resource.updateSchema,
        emptyJsonSchema,
        'should set resource.updateSchema to an empty JSON schema'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "schema" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      schema: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    }
    const expected = {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.createSchema,
        expected,
        'should set resource.createSchema to the value of the passed "schema" option'
      )
      t.same(
        resource.updateSchema,
        expected,
        'should set resource.updateSchema to the value of the passed "schema" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "createSchema" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      createSchema: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.createSchema,
        opts.createSchema,
        'should set resource.createSchema to the value of the passed "screateSchema" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "updateSchema" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      updateSchema: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.updateSchema,
        opts.updateSchema,
        'should set resource.updateSchema to the value of the passed "updateSchema" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing a "columns" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      const ref = [
        {
          name: 'id',
          type: 'integer'
        }
      ]
      t.same(
        resource.columns,
        ref,
        'should set resource.columns with a list generated from base schema properties'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test(
    'creating a resource without passing a "columns" option but with a "schema"',
    async t => {
      const opts = {
        name: 'test',
        provider: new RbDataProvider(),
        schema: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' }
          }
        }
      }
      try {
        const resource = createResource(opts)
        const ref = [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'title',
            type: 'string'
          }
        ]
        t.same(
          resource.columns,
          ref,
          'should set resource.columns with a list generated from passed "schema" properties'
        )
      } catch (err) {
        console.error(err)
        t.error(err, 'should not throw any error')
      }
    }
  )

  t.test('creating a resource passing a "columns" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      columns: [
        {
          name: 'id',
          type: 'integer'
        },
        {
          name: 'title',
          type: 'string'
        }
      ]
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.columns,
        opts.columns,
        'should set resource.columns to the value of the passed "columns" option'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "displayAttr" option', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      displayAttr: 'name'
    }
    const instance = {
      name: 'Test #1'
    }
    try {
      const resource = createResource(opts)
      const res = resource.stringify(instance)
      t.equal(
        resource.displayAttr,
        opts.displayAttr,
        'should set resource.displayAttr to the value of the passed "displayAttr" option'
      )
      t.equal(
        res,
        instance.name,
        'should use the passed "displayAttr" to create a textual representation of the resource instance'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test(
    'creating a resource passing a "stringify" function option',
    async t => {
      const opts = {
        name: 'test',
        provider: new RbDataProvider(),
        stringify: data => data.name.toUpperCase()
      }
      const instance = {
        name: 'Test #1'
      }
      try {
        const resource = createResource(opts)
        const res = resource.stringify(instance)
        t.equal(
          res,
          instance.name.toUpperCase(),
          'should use the passed "stringify" function to create a textual representation of the resource instance'
        )
      } catch (err) {
        console.error(err)
        t.error(err, 'should not throw any error')
      }
    }
  )

  t.test('creating a resource passing a "defaultParams" object', async t => {
    let res = ''
    class DummyDataProvider extends RbDataProvider {
      async getMany (resource, params) {
        res = params
        return { data: [] }
      }
    }
    const opts = {
      name: 'test',
      provider: new DummyDataProvider(),
      defaultParams: {
        filters: {
          category: 1
        }
      }
    }
    try {
      const resource = createResource(opts)
      await resource.getMany({ foo: 'bar', filters: { name: 'test' } })
      const expected = {
        foo: 'bar',
        filters: { category: 1, name: 'test' }
      }
      t.same(res, expected, 'should merge the given params with default ones')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing a "relations" object', async t => {
    const tags = createResource({
      name: 'tags',
      provider: new RbDataProvider()
    })
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      relations: { tags }
    }
    try {
      const resource = createResource(opts)
      const relatedResource = resource.related(1, tags.name)
      const expected = 'test/1/tags'
      t.same(
        relatedResource.path,
        expected,
        'should use the correct related resource endpoint'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing an "actions" object', async t => {
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
      t.ok(
        'foo' in resource.actions,
        'should have registered the given actions'
      )
      const res = resource.actions.foo()
      t.equal(
        res,
        resource,
        'should have bound `this` to the current action resource'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource without passing an "ui" object', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider()
    }
    try {
      const resource = createResource(opts)
      t.ok('ui' in resource, 'should have set an empty "ui" attribute')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('creating a resource passing an "ui" object', async t => {
    const opts = {
      name: 'test',
      provider: new RbDataProvider(),
      ui: {
        icon: 'test'
      }
    }
    try {
      const resource = createResource(opts)
      t.same(
        resource.ui,
        opts.ui,
        'should have assigned the passed "ui" attribute'
      )
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })
})
