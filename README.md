# webreed

Webreed aims to be a simple yet flexible static website generator.

[![Build Status](https://travis-ci.org/webreed/webreed.svg?branch=master)](https://travis-ci.org/webreed/webreed)
[![Dependency Status](https://david-dm.org/webreed/webreed.svg)](https://david-dm.org/webreed/webreed)
[![devDependency Status](https://david-dm.org/webreed/webreed/dev-status.svg)](https://david-dm.org/webreed/webreed#info=devDependencies)


## Installation

```sh
$ npm install --save-dev webreed
```


## Usage

### CLI

The command line interface is provided by the [webreed-cli](https://github.com/webreed/webreed-cli)
package which can be installed globally using the following command:

```sh
$ npm install --g webreed-cli
```

### Node (with JavaScript)

```javascript
const webreed = require("webreed");

let projectRootPath = "/webreed-projects/example.com";
let options = { };

let env = webreed(projectRootPath, options);
env.build()
  .then(() => {
    console.log("Completed!");
  }); 
```

### Node (with TypeScript)

```typescript
import webreed = require("webreed");

let projectRootPath = "/webreed-projects/example.com";
let options = { };

let env = webreed(projectRootPath, options);
env.build()
  .then(() => {
    console.log("Completed!");
  }); 
```


## Contribution Agreement

This project is licensed under the MIT license (see LICENSE). To be in the best
position to enforce these licenses the copyright status of this project needs to
be as simple as possible. To achieve this the following terms and conditions
must be met:

- All contributed content (including but not limited to source code, text,
  image, videos, bug reports, suggestions, ideas, etc.) must be the
  contributors own work.

- The contributor disclaims all copyright and accepts that their contributed
  content will be released to the public domain.

- The act of submitting a contribution indicates that the contributor agrees
  with this agreement. This includes (but is not limited to) pull requests, issues,
  tickets, e-mails, newsgroups, blogs, forums, etc.
