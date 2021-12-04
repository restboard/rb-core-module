# rb-core-module

The [Restboard](https://restboard.github.io/) core module

## Getting started

First of all, you need to install the package in your project:

```bash
npm i --save rb-core-module
```

Now, you can start to define and use your resources:

```js
import { createResource } from 'rb-core-module'

const users = createResource({
  name: 'users',
  provider: ..., // The data provider used to query the API
  ...
})

// After creating the resource, you can use it
// to interact with your API. e.g.:

const me = await users.getOne({ id: 1 })
```

## Resources

### Options

| Name            | Description                                                   |
|-----------------|---------------------------------------------------------------|
| `name`          | The unique resource name (e.g. `users`)                       |
| `path`          | The resource base path (if different than `name`)             |
| `provider`      | The data provider used to interact with the API               |
| `key`           | The identifier attribute name. *Default: `id`*                |
| `label`         | A human-readable description label for the resource. *Default: capitalized name* |
| `displayAttr`   | The attr used as representation of a single resource instance |
| `stringify`     | A function used to get a human-readable reperesentation of a single resource instance. *Default: `instance => instance[resource.displayAttr]`* |
| `schema`        | The JSON schema representing the strcuture of resource instances |
| `updateSchema`  | The JSON schema used on update. *Default: `schema`*           |
| `createSchema`  | The JSON schema used on creation. *Default: `schema`*         |
| `defaultParams` | Default params passed to the data provider when fetching the API (e.g. default filters) |
| `isKeyEditable` | If `true`, allows editing the `key` of an instance. *Default: `false`* |
| `relations`     | A map of related child resources                              |
| `actions`       | A map of actions executable on a single resource instance     |
| `ui`            | An object containing UI-specific options and methods          |

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
