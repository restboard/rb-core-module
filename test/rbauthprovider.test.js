import * as t from "tap";
import { RbAuthProvider, errors } from "../src/index";

const { ERR_NOT_IMPLEMENTED } = errors;

t.test("RbAuthProvider", async (t) => {
  t.test("calling `login` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.login();
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });

  t.test("calling `logout` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.logout();
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });

  t.test("calling `checkAuth` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.checkAuth();
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });

  t.test("calling `getIdentity` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.getIdentity({});
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });

  t.test("calling `can` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.can({}, '/test');
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });
});
