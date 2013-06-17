# hash-router

<!-- [![browser support][5]][6] -->

<!-- [![build status][1]][2] [![Coverage Status][9]][10] [![davis dependency status][3]][4] [![gemnasium Dependency Status][11]][12] [![NPM version][7]][8] -->

A frontend router for the hash change event

## Example

```js
var HashRouter = require("hash-router")

var router = HashRouter()
router.addRoute("/", renderHome)
router.addRoute("/login", showLoginDialog)

window.addEventListener("hashchange", router)
router() // start the router
```

## Installation

`npm install hash-router`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/hash-router.png
  [2]: https://travis-ci.org/Raynos/hash-router
  [3]: https://david-dm.org/Raynos/hash-router.png
  [4]: https://david-dm.org/Raynos/hash-router
  [5]: https://ci.testling.com/Raynos/hash-router.png
  [6]: https://ci.testling.com/Raynos/hash-router
  [7]: https://badge.fury.io/js/hash-router.png
  [8]: https://badge.fury.io/js/hash-router
  [9]: https://coveralls.io/repos/Raynos/hash-router/badge.png
  [10]: https://coveralls.io/r/Raynos/hash-router
  [11]: https://gemnasium.com/Raynos/hash-router.png
  [12]: https://gemnasium.com/Raynos/hash-router
