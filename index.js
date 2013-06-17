var Router = require("routes")
var url = require("url")
var location = require("global/document").location

module.exports = HashRouter

function HashRouter(opts) {
    function applyChange(event) {
        var hash = getRoute()

        var route = router.match(hash)
        if (route) {
            var newHash = event ?
                url.parse(event.newURL).hash.substring(1) : hash
            var oldHash = event ?
                url.parse(event.oldURL).hash.substring(1) : hash

            route.fn(hash, {
                params: route.params,
                splats: route.splats,
                newUrl: newHash,
                oldUrl: oldHash
            })
        }
    }

    opts = opts || {}
    var setRoute = opts.setRoute || defaultSetRoute
    var getRoute = opts.getRoute || defaultGetRoute

    var router = Router()

    applyChange.go = setRoute
    applyChange.addRoute = router.addRoute.bind(router)

    return applyChange
}

function defaultSetRoute(uri) {
    location.hash = "#" + uri
}

function defaultGetRoute() {
    return location.hash.substring(1)
}
