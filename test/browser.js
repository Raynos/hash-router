var test = require("tape")
var location = require("global/document").location

var HashRouter = require("../index.js")
require("./index.js")

test("HashRouter set's hash", function (assert) {
    var router = HashRouter()

    router.go("/foo")

    assert.equal(location.hash, "#/foo")
    assert.end()
})

// test("HashRouter ")
