# rb-core-module

The [Restboard](https://restboard.github.io/) core module

[![Node.js CI](https://github.com/restboard/rb-core-module/actions/workflows/node.js.yml/badge.svg)](https://github.com/restboard/rb-core-module/actions/workflows/node.js.yml)

## Getting started

First of all, you need to install the package in your project:

```bash
npm i --save rb-core-module
```

Now, you can start to define and use your [resources](#RbResource):

```js
import { createResource } from 'rb-core-module'

// Create a new resource
const users = createResource({
  name: 'users',
  provider: ..., // The data provider used to query the API
  ...
})

// Resources can then be used to interact with the remote API:
const me = await users.getOne(1)
```

## RbResource

`RbResource` is a base class used to implement a proxy to interact with a remote API resource.

### Options

| Name            | Description                                                                                                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | The unique resource name (e.g. `users`)                                                                                                                                                                                                 |
| `path`          | The resource base path (if different than `name`)                                                                                                                                                                                       |
| `provider`      | The data provider used to interact with the API                                                                                                                                                                                         |
| `key`           | The identifier attribute name. _Default: `id`_                                                                                                                                                                                          |
| `label`         | A human-readable description label for the resource. _Default: capitalized name_                                                                                                                                                        |
| `displayAttr`   | The attr used as representation of a single resource instance                                                                                                                                                                           |
| `stringify`     | A function used to get a human-readable reperesentation of a single resource instance. _Default: `instance => instance[resource.displayAttr]`_                                                                                          |
| `schema`        | The JSON schema representing the strcuture of resource instances                                                                                                                                                                        |
| `updateSchema`  | The JSON schema used on update. _Default: `schema`_                                                                                                                                                                                     |
| `createSchema`  | The JSON schema used on creation. _Default: `schema`_                                                                                                                                                                                   |
| `defaultParams` | Default params passed to the data provider when fetching the API (e.g. default filters)                                                                                                                                                 |
| `isKeyEditable` | If `true`, allows editing the `key` of an instance. _Default: `false`_                                                                                                                                                                  |
| `actions`       | A map of actions executable on a single resource instance                                                                                                                                                                               |
| `listeners`     | A list of callbacks to be called when the resource is marked as dirty                                                                                                                                                                   |
| `ui`            | An object containing UI-specific options and methods. A special `formComponent` key will be used to assign default form components for creation (`ui.createFormComponent`) and update (`ui.updateFormComponent`) if none are specified. |

### Methods

| Signature                      | Description    |
| ------------------------------ | -------------- |
| `getKey(instance)`             | Retrieve the primary key of the given resource instance |
| `getMany(params)`              | Retrieve a list of resource instances according to the given `params` |
| `getOne(key, params)`          | Retrieve a single resource instance, identified by `key` and `params` |
| `updateOne(key, data, params)` | Update a single resource instance, identified by `key` and `params`, with the given `data` |
| `updateMany(data, params)`     | Update multiple resource instances according to `data` and `params` |
| `deleteOne(key, params)`       | Delete a single resource instance identified by `key` and `params` |
| `deleteMany(keys, params)`     | Delete multiple resource instances identified by the `keys` array and `params` |
| `getRelation(key, name, opts)` | Return the related resource identified by `name`, scoped to the instance identified by `key`. For `opts` see **Relation options** |
| `setDirty()`                   | Set the resource `lastUpdate` with the current timestamp and notify registered listeners |
| `addListener(callback)`        | Register a new listener callback |
| `removeListener(callback)`     | Unregister a previously registered listener callback |
| `mergeParams(params)`          | Merge given `params` with resource default ones |

### Relation options

| Name                  | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `notifyParentOnDirty` | If `true` mark also the parent resource as dirty (_default `true`_) |

## RbDataProvider

`RbDataProvider` is a generic interface used by resources to interact with a
third-party API using the correct protocol and dialect.

### Methods

| Signature                                    | Description                   |
| -------------------------------------------- | ----------------------------- |
| `getMany(resourcePath, params)`              | See [RbResource](#RbResource) |
| `getOne(resourcePath, key, params)`          | See [RbResource](#RbResource) |
| `updateOne(resourcePath, key, data, params)` | See [RbResource](#RbResource) |
| `updateMany(resourcePath, data, params)`     | See [RbResource](#RbResource) |
| `deleteOne(resourcePath, key, params)`       | See [RbResource](#RbResource) |
| `deleteMany(resourcePath, keys, params)`     | See [RbResource](#RbResource) |

## RbAuthProvider

`RbAuthProvider` is a generic interface used to perform authentication and
authorization over a third-party API, abstracting the details of underlying
strategies.

### Methods

| Signature                    | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| `login(credentials)`         | Attempt to log the user identified by the given `credentials`   |
| `logout()`                   | Terminate the current authenticated session                     |
| `checkAuth()`                | Check if the current authenticated session is still valid       |
| `getIdentity(user)`          | Given a `user`, retrieve its textual representation             |
| `getTenantIdentity(user)`    | Given a `user`, retireve its tenant identity                    |
| `can(user, action, subject)` | Check if the given `user` can perform `action` on the `subject` |

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test
```

## Contribute

If you want, you can also freely donate to fund the project development:

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://paypal.me/EBertoldi)

## Have you found a bug?

Please open a new issue on:

<https://github.com/restboard/rb-core-module/issues>

## License

Copyright (c) Emanuele Bertoldi

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
