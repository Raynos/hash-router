var Router = require("routes")
var url = require("url")
var location = require("global/document").location

module.exports = HashRouter

function HashRouter(opts) {
    function applyChange(event) {
        var hash = getRoute()

        if (hash === "") {
            return
        }

        var route = router.match(hash)
        if (route) {
            var newHash = hash
            var oldHash = "/"

            if (event) {
                var newUrl = url.parse(event.newURL)
                if (newUrl && "hash" in newUrl) {
                    newHash = newUrl.hash.substring(1)
                }

                var oldUrl = url.parse(event.oldURL)
                if (oldUrl && "hash" in oldUrl) {
                    oldHash = oldUrl.hash.substring(1)
                }
            }

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
    applyChange.get = getRoute
    applyChange.addRoute = router.addRoute.bind(router)

    return applyChange
}

function defaultSetRoute(uri) {
    location.hash = "#" + uri
}

function defaultGetRoute() {
    return location.hash.substring(1)
}
