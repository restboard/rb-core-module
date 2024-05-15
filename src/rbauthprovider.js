import { ERR_NOT_IMPLEMENTED } from "./errors.js";

/**
 * The base class for auth providers
 *
 * @export
 * @class RbAuthProvider
 */
export class RbAuthProvider {
  /**
   * Attempt to authenticate a user matching the given credentials
   *
   * @param {Object} credentials - The authentication credentials
   * @return {Promise<Object>} The authenticated session response
   * @memberof RbAuthProvider
   */
  async login(credentials) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Terminate the current user session (if any)
   *
   * @memberof RbAuthProvider
   */
  async logout() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Attempt to recover user credentials providing a valid challenge response
   *
   * @param {Object} challenge - The response payload to the credentials recovery challenge
   * @memberof RbAuthProvider
   */
  async recoverCredentials(challenge) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Activate or reset existing user credentials
   *
   * @param {Object} payload - The activate / reset credentials payload
   * @memberof RbAuthProvider
   */
  async activateOrResetCredentials(payload) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Verify the current session is still active and refresh it
   *
   * @return {Promise<Object>} The authenticated session response
   * @memberof RbAuthProvider
   */
  async checkAuth() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Return the identity string of the given user
   *
   * @param {Object} user - The user to get the identity for
   * @return {Promise<String>} The identity of the given user
   * @memberof RbAuthProvider
   */
  async getIdentity(user) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Return the tenant identity string of the given user
   *
   * It can be used in a multi-tenant application to get the tenant
   * identity a user is associated to.
   *
   * @param {Object} user - The user to get the tenant identity for
   * @return {Promise<String>} The tenant identity the given user is associated to
   * @memberof RbAuthProvider
   */
  async getTenantIdentity(user) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  /**
   * Check if the given user is authorized to perform the action (on the target)
   *
   * @param {Object} user - The user to check the authorization for
   * @param {String} action - The action to be authorized
   * @param {Object|Number|String} [subject=null] - The (optional) target of the action
   * @return {Boolean} True if the user is authorized to perform the action, false otherwise
   * @memberof RbAuthProvider
   */
  can(user, action, subject = null) {
    return true;
  }
}

export default {
  RbAuthProvider,
};
