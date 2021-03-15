import * as t from "tap";
import { createResource, errors, RbDataProvider } from "../src/index";

const {
  ERR_MISSING_RESOURCE_NAME,
  ERR_MISSING_RESOURCE_DATA_PROVIDER,
  ERR_INVALID_RESOURCE_DATA_PROVIDER,
} = errors;

t.test("createResource", async (t) => {
  t.test("creating an instance without passing resource name", async (t) => {
    try {
      createResource();
      t.fail(`should throw ${ERR_MISSING_RESOURCE_NAME}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_MISSING_RESOURCE_NAME,
        `should throw ${ERR_MISSING_RESOURCE_NAME}`
      );
    }
  });

  t.test("creating an instance without passing a data provider", async (t) => {
    const opts = {
      name: "test",
    };
    try {
      createResource(opts);
      t.fail(`should throw ${ERR_MISSING_RESOURCE_DATA_PROVIDER}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_MISSING_RESOURCE_DATA_PROVIDER,
        `should throw ${ERR_MISSING_RESOURCE_DATA_PROVIDER}`
      );
    }
  });

  t.test("creating an instance passing an invalid data provider", async (t) => {
    const opts = {
      name: "test",
      provider: {},
    };
    try {
      createResource(opts);
      t.fail(`should throw ${ERR_INVALID_RESOURCE_DATA_PROVIDER}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_INVALID_RESOURCE_DATA_PROVIDER,
        `should throw ${ERR_INVALID_RESOURCE_DATA_PROVIDER}`
      );
    }
  });

  t.test("creating an instance passing a valid data provider", async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.name,
        opts.name,
        'should set resource.name to the value of the passed "name" option'
      );
      t.equal(
        resource.provider,
        opts.provider,
        'should set resource.provider to the value of the passed "provider" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance without passing a "key"', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.equal(resource.key, "id", 'should set resource.key = "id"');
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "key" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      key: "myId",
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.key,
        opts.key,
        'should set resource.key to the value of the passed "key" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance without passing a "label" option', async (t) => {
    const opts = {
      name: "test_resource",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.label,
        "Test resource",
        "should set resource.label with a human-readable version of resource name"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "label" option', async (t) => {
    const opts = {
      name: "test_resource",
      provider: new RbDataProvider(),
      label: "Tests",
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.label,
        opts.label,
        'should set resource.label to the value of the passed "label" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test("creating an instance without passing any schema", async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
    };
    const emptyJsonSchema = {
      type: "object",
      properties: {},
    };
    try {
      const resource = createResource(opts);
      t.deepEqual(
        resource.createSchema,
        emptyJsonSchema,
        "should set resource.createSchema to an empty JSON schema"
      );
      t.deepEqual(
        resource.updateSchema,
        emptyJsonSchema,
        "should set resource.updateSchema to an empty JSON schema"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "schema" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      schema: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
    };
    try {
      const resource = createResource(opts);
      t.deepEqual(
        resource.createSchema,
        opts.schema,
        'should set resource.createSchema to the value of the passed "schema" option'
      );
      t.deepEqual(
        resource.updateSchema,
        opts.schema,
        'should set resource.updateSchema to the value of the passed "schema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "createSchema" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      createSchema: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
    };
    try {
      const resource = createResource(opts);
      t.deepEqual(
        resource.createSchema,
        opts.createSchema,
        'should set resource.createSchema to the value of the passed "screateSchema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "updateSchema" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      updateSchema: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
    };
    try {
      const resource = createResource(opts);
      t.deepEqual(
        resource.updateSchema,
        opts.updateSchema,
        'should set resource.updateSchema to the value of the passed "updateSchema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test(
    'creating an instance without passing a "columns" option',
    async (t) => {
      const opts = {
        name: "test",
        provider: new RbDataProvider(),
      };
      try {
        const resource = createResource(opts);
        const ref = [
          {
            name: "id",
            type: "integer",
          },
        ];
        t.same(
          resource.columns,
          ref,
          "should set resource.columns with a list generated from base schema properties"
        );
      } catch (err) {
        console.error(err);
        t.error(err, "should not throw any error");
      }
    }
  );

  t.test(
    'creating an instance without passing a "columns" option but with a "schema"',
    async (t) => {
      const opts = {
        name: "test",
        provider: new RbDataProvider(),
        schema: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
          },
        },
      };
      try {
        const resource = createResource(opts);
        const ref = [
          {
            name: "id",
            type: "integer",
          },
          {
            name: "title",
            type: "string",
          },
        ];
        t.same(
          resource.columns,
          ref,
          'should set resource.columns with a list generated from passed "schema" properties'
        );
      } catch (err) {
        console.error(err);
        t.error(err, "should not throw any error");
      }
    }
  );

  t.test('creating an instance passing a "columns" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      columns: [
        {
          name: "id",
          type: "integer",
        },
        {
          name: "title",
          type: "string",
        },
      ],
    };
    try {
      const resource = createResource(opts);
      t.same(
        resource.columns,
        opts.columns,
        'should set resource.columns to the value of the passed "columns" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing an "icon" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      icon: "group"
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.icon,
        opts.icon,
        'should set resource.icon to the value of the passed "icon" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "displayAttr" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      displayAttr: "name"
    };
    const instance = {
      name: 'Test #1'
    }
    try {
      const resource = createResource(opts);
      const res = resource.stringify(instance)
      t.equal(
        resource.displayAttr,
        opts.displayAttr,
        'should set resource.displayAttr to the value of the passed "displayAttr" option'
      );
      t.equal(
        res,
        instance.name,
        'should use the passed "displayAttr" to create a textual representation of the resource instance'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating an instance passing a "stringify" function option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      stringify: data => data.name.toUpperCase()
    };
    const instance = {
      name: 'Test #1'
    }
    try {
      const resource = createResource(opts);
      const res = resource.stringify(instance)
      t.equal(
        res,
        instance.name.toUpperCase(),
        'should use the passed "stringify" function to create a textual representation of the resource instance'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });
});
