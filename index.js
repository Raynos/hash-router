var Router = require("routes")
var url = require("url")
var location = require("global/document").location
var EventEmitter = require("events").EventEmitter
var extend = require("xtend/mutable")

module.exports = HashRouter

function HashRouter(opts) {
    function applyChange(event) {
        var hash = getRoute()
        var newHash = hash
        var oldHash = "#/"

        if (event && "newURL" in event && "oldURL" in event) {
            var newUrl = url.parse(event.newURL)
            if (newUrl && newUrl.hash) {
                newHash = newUrl.hash
            }

            var oldUrl = url.parse(event.oldURL)
            if (oldUrl && oldUrl.hash) {
                oldHash = oldUrl.hash
            }
        }

        var route = router.match(hash)
        if (route) {
            route.fn(hash, {
                params: route.params,
                splats: route.splats,
                newUrl: newHash,
                oldUrl: oldHash
            })
        }

        applyChange.emit("hash", hash, {
            newUrl: newHash, oldUrl: oldHash
        })
    }

    opts = opts || {}
    var setRoute = opts.setRoute || defaultSetRoute
    var getRoute = opts.getRoute || defaultGetRoute

    var router = Router()

    applyChange.go = setRoute
    applyChange.get = getRoute
    applyChange.addRoute = router.addRoute.bind(router)

    extend(applyChange, EventEmitter.prototype)
    EventEmitter.call(applyChange)

    return applyChange
}

function defaultSetRoute(uri) {
    location.hash = uri
}

function defaultGetRoute() {
    return location.hash || "#/"
}
