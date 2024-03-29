import t from "tap";
import { ERR_INVALID_RESOURCE_DATA_PROVIDER } from "../../src/errors.js";
import { RbDataProvider } from "../../src/rbdataprovider.js";
import { createResource } from "../../src/rbresource.js";

t.test("createResource", async (t) => {
  t.test("creating a resource passing an invalid data provider", async (t) => {
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

  t.test("creating a resource passing a valid data provider", async (t) => {
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

  t.test('creating a resource without passing a "path" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.path,
        opts.name,
        'should assign the passed "name" option as "path"'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "path" option', async (t) => {
    const opts = {
      name: "test",
      path: "products",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.equal(resource.path, opts.path, 'should use the passed "path" option');
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource without passing a "key"', async (t) => {
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

  t.test('creating a resource passing a "key" option', async (t) => {
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

  t.test('creating a resource without passing a "label" option', async (t) => {
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

  t.test('creating a resource passing a "label" option', async (t) => {
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

  t.test("creating a resource without passing any schema", async (t) => {
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
      t.same(
        resource.createSchema,
        emptyJsonSchema,
        "should set resource.createSchema to an empty JSON schema"
      );
      t.same(
        resource.updateSchema,
        emptyJsonSchema,
        "should set resource.updateSchema to an empty JSON schema"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "schema" option', async (t) => {
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
    const expected = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    };
    try {
      const resource = createResource(opts);
      t.same(
        resource.createSchema,
        expected,
        'should set resource.createSchema to the value of the passed "schema" option'
      );
      t.same(
        resource.updateSchema,
        expected,
        'should set resource.updateSchema to the value of the passed "schema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "createSchema" option', async (t) => {
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
      t.same(
        resource.createSchema,
        opts.createSchema,
        'should set resource.createSchema to the value of the passed "screateSchema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "updateSchema" option', async (t) => {
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
      t.same(
        resource.updateSchema,
        opts.updateSchema,
        'should set resource.updateSchema to the value of the passed "updateSchema" option'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "displayAttr" option', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      displayAttr: "name",
    };
    const instance = {
      name: "Test #1",
    };
    try {
      const resource = createResource(opts);
      const res = resource.stringify(instance);
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

  t.test(
    'creating a resource passing a "stringify" function option',
    async (t) => {
      const opts = {
        name: "test",
        provider: new RbDataProvider(),
        stringify: (data) => data.name.toUpperCase(),
      };
      const instance = {
        name: "Test #1",
      };
      try {
        const resource = createResource(opts);
        const res = resource.stringify(instance);
        t.equal(
          res,
          instance.name.toUpperCase(),
          'should use the passed "stringify" function to create a textual representation of the resource instance'
        );
      } catch (err) {
        console.error(err);
        t.error(err, "should not throw any error");
      }
    }
  );

  t.test('creating a resource passing a "defaultParams" object', async (t) => {
    let res = "";
    class DummyDataProvider extends RbDataProvider {
      async getMany(resource, params) {
        res = params;
        return { data: [] };
      }
    }
    const opts = {
      name: "test",
      provider: new DummyDataProvider(),
      defaultParams: {
        filters: {
          category: 1,
        },
      },
    };
    try {
      const resource = createResource(opts);
      await resource.getMany({ foo: "bar", filters: { name: "test" } });
      const expected = {
        foo: "bar",
        filters: { category: 1, name: "test" },
      };
      t.same(res, expected, "should merge the given params with default ones");
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "listeners" object', async (t) => {
    const tags = createResource({
      name: "tags",
      provider: new RbDataProvider(),
    });
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      listeners: [() => {}],
    };
    try {
      const resource = createResource(opts);
      t.equal(
        resource.listeners.length,
        1,
        "should have registered passed listeners"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing an "actions" object', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      actions: {
        foo() {
          return this;
        },
      },
    };
    try {
      const resource = createResource(opts);
      t.ok(
        "foo" in resource.actions,
        "should have registered the given actions"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource without passing an "ui" object', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
    };
    try {
      const resource = createResource(opts);
      t.ok("ui" in resource, 'should have set an empty "ui" attribute');
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing an "ui" object', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      ui: {
        icon: "test",
      },
    };
    try {
      const resource = createResource(opts);
      t.same(
        resource.ui.icon,
        opts.ui.icon,
        'should have assigned the passed "ui" attribute'
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test('creating a resource passing a "methods" object', async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      methods: {
        testOne: function () {
          this.test = "test1";
        },
        testTwo() {
          this.test = "test2";
        },
      },
    };
    try {
      const resource = createResource(opts);
      t.ok("testOne" in resource, "should have registered a method by name");
      resource.testOne();
      t.equal(
        resource.test,
        "test1",
        "should invoke the method with the current binding"
      );
      t.ok(
        "testTwo" in resource,
        "should have registered a method inferring its name"
      );
      resource.testTwo();
      t.equal(
        resource.test,
        "test2",
        "should invoke the method with the current binding"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });
});
