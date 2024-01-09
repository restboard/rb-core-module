import t from "tap";
import { RbDataProvider } from "../../src/rbdataprovider.js";
import { createResource } from "../../src/rbresource.js";

t.test("getActions", async (t) => {
  t.test("executing a function", async (t) => {
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
      const fooRes = resource.getActions().foo();
      t.equal(
        fooRes,
        resource,
        "should have bound the resource as `this` of the action"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test("executing an action object", async (t) => {
    const opts = {
      name: "test",
      provider: new RbDataProvider(),
      actions: {
        bar: {
          isVisible() {
            return this;
          },
          run() {
            return this;
          },
        },
      },
    };
    try {
      const resource = createResource(opts);
      const { bar } = resource.getActions();
      const barRes = bar.run();
      t.equal(
        barRes,
        resource,
        "should have bound the resource as `this` of the action handler"
      );
      const barVisible = bar.isVisible();
      t.equal(
        barVisible,
        resource,
        "should have bound the resource as `this` of the action isVisible method"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });
});
