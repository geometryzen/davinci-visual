// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
requirejs.config({
  // all modules loaded are relative to this path
  // e.g. require(["abc/core"]) would grab /src/abc/core.js
  baseUrl: "./amd",

  // specify custom module name paths
  paths: {
    "cs": "../vendor/require-cs/cs",
    "coffee-script": "../vendor/coffee-script/extras/coffee-script",
    "spec": "../test/spec"
  },

  "shim": {
    "THREE": ["../vendor/threejs/build/three.js"]
  },

  // target amd loader shim as the main module, path is relative to baseUrl.
  name: "../vendor/almond/almond",

  optimize: "none",

  // files to include along with almond. only davinci-visual is defined, as
  // it pulls in the rest of the dependencies automatically.
  include: ["davinci-visual"],

  // code to wrap around the start / end of the resulting build file
  // the global variable used to expose the API is defined here
  wrap: {
    start: "(function(global, define)\n"+
           "{\n"+
           "  var THREE = global.THREE;\n"+
           "\n",

    end:   "var library = require('davinci-visual');\n"+
           "if (typeof module !== 'undefined' && module.exports)\n"+
           "{\n"+
           "  // Export library for CommonJS/Node.\n"+
           "  module.exports = library;\n"+
           "}\n"+
           "else if (global.define)\n"+
           "{\n"+
           "  // Define library for global AMD loader that is already present.\n"+
           "  (function (define) {define(function () { return library; });}(global.define));\n"+
           "}\n"+
           "else\n"+
           "{\n"+
           "  // Define library on global namespace for inline script loading.\n"+
           "  global['visual'] = library;\n"+
           "}\n"+
           "\n"+
           "}(this));\n"
  },

  // don't include coffeescript compiler in optimized file
  stubModules: ["cs","coffee-script"],

  // build file destination, relative to the build file itself
  out: "./dist/davinci-visual.js"
})