var test = require("tape")
var bind = require("function-bind")

var HashRouter = require("../index.js")

Function.prototype.bind = bind

test("HashRouter is a function", function (assert) {
    assert.equal(typeof HashRouter, "function")
    assert.end()
})

test("HashRouter set's route", function (assert) {
    var location = LocationShim()
    var router = HashRouter(location)

    router.go("#/foo")

    assert.equal(location.getRoute(), "#/foo")
    assert.end()
})

test("HashRouter broadcasts initial route when called", function (assert) {
    var location = LocationShim()
    var router = HashRouter(location)

    router.addRoute("#/", function (hash, opts) {
        assert.equal(hash, "#/")
        assert.deepEqual(opts, {
            params: {},
            splats: [],
            newUrl: "#/",
            oldUrl: "#/"
        })

        assert.end()
    })

    router()
})

test("HashRouter broadcasts deltas in routes", function (assert) {
    var location = LocationShim("#/foo")
    var router = HashRouter(location)

    router.addRoute("#/bar", function (hash, opts) {
        assert.equal(hash, "#/bar")
        assert.deepEqual(opts, {
            params: {},
            splats: [],
            newUrl: "#/bar",
            oldUrl: "#/foo"
        })

        assert.end()
    })

    router()
    location.setRoute("#/bar")
    router({
        newURL: "/#/bar",
        oldURL: "/#/foo"
    })
})

test("HashRouter deals with no hash in previous route", function (assert) {
    var location = LocationShim("#/foo")
    var router = HashRouter(location)

    router.addRoute("#/bar", function (hash, opts) {
        assert.equal(hash, "#/bar")
        assert.deepEqual(opts, {
            params: {},
            splats: [],
            newUrl: "#/bar",
            oldUrl: "#/"
        })

        assert.end()
    })

    router()
    location.setRoute("#/bar")
    router({
        newURL: "/#/bar",
        oldURL: ""
    })
})

test("HashRouter deals with no hash in new route", function (assert) {
    var location = LocationShim("#/foo")
    var router = HashRouter(location)

    router.addRoute("*", function (hash, opts) {
        if (hash === "#/foo") {
            return
        }

        assert.equal(hash, "#/")
        assert.deepEqual(opts, {
            params: {},
            splats: ["#/"],
            newUrl: "#/",
            oldUrl: "#/foo"
        })

        assert.end()
    })

    router()
    location.setRoute("#/")
    router({
        newURL: "",
        oldURL: "/#/foo"
    })
})

function LocationShim(uri) {
    uri = uri || "#/"

    function getRoute() { return uri }
    function setRoute(value) { uri = value }

    return { setRoute: setRoute, getRoute: getRoute }
}
