import t from "tap";
import { RbDataProvider } from "../../src/rbdataprovider.js";
import { createResource } from "../../src/rbresource.js";

t.test("getRelation", async (t) => {
  t.test("getting a related resource should update path", async (t) => {
    const provider = new RbDataProvider();
    const res1 = createResource({ name: "res1", provider });
    const res2 = createResource({ name: "res2", provider });
    try {
      const related = res1.getRelation(1, res2);
      t.equal(
        related.path,
        "res1/1/res2",
        "should have updated the path with the related resource"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });

  t.test("getting a related resource should keep extra methods", async (t) => {
    const provider = new RbDataProvider();
    const res1 = createResource({ name: "res1", provider });
    const res2 = createResource({
      name: "res2",
      provider,
      methods: {
        foo() {
          return this.path;
        },
      },
    });
    try {
      const related = res1.getRelation(1, res2);
      t.ok("foo" in related, "should have the extra method");
      t.equal(
        related.foo(),
        "res1/1/res2",
        "should have bound the related resource as `this` of the extra method"
      );
    } catch (err) {
      console.error(err);
      t.error(err, "should not throw any error");
    }
  });
});
