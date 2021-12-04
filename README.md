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
