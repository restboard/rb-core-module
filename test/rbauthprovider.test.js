import t from "tap";
import { ERR_NOT_IMPLEMENTED } from "../src/errors.js";
import { RbAuthProvider } from "../src/rbauthprovider.js";

t.test("RbAuthProvider", async (t) => {
  t.test("calling `login` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.login({});
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

  t.test("calling `recoverCredentials` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.recoverCredentials({});
      t.fail(`should throw ${ERR_NOT_IMPLEMENTED}`);
    } catch (err) {
      t.equal(
        err.message,
        ERR_NOT_IMPLEMENTED,
        `should throw ${ERR_NOT_IMPLEMENTED}`
      );
    }
  });

  t.test("calling `activateOrResetCredentials` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.activateOrResetCredentials({});
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

  t.test("calling `getTenantIdentity` on base class", async (t) => {
    const provider = new RbAuthProvider();
    try {
      await provider.getTenantIdentity({});
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
      await provider.can({}, "test");
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
